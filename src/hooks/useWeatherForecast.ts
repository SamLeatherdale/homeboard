import { useHass } from "@hakit/core";
import type { Connection } from "home-assistant-js-websocket";
import { useEffect, useState } from "react";
import { env } from "../env.ts";

export type WeatherForecastDay = {
	datetime: string;
	temperature: number;
	templow?: number;
	condition?: string;
};

export type WeatherForecastEvent = {
	type: "daily" | "hourly" | "twice_daily";
	forecast: WeatherForecastDay[] | null;
};

/**
 * Subscribe to HA weather forecasts without @hakit/core's useWeather race:
 * its debounced subscribe + `_subscribed` flag can drop the initial forecast
 * event, leaving a stale/empty forecast until the next HA push.
 */
export function useWeatherForecast(
	entityId: string = env.ENTITY_WEATHER,
	forecastType: WeatherForecastEvent["type"] = "daily",
) {
	const { useStore } = useHass();
	const connection = useStore((state) => state.connection) as
		| Connection
		| null
		| undefined;
	const [forecast, setForecast] = useState<WeatherForecastEvent | null>(null);

	useEffect(() => {
		if (!connection) {
			return;
		}

		let cancelled = false;
		let unsubscribe: (() => Promise<void>) | undefined;

		void connection
			.subscribeMessage<WeatherForecastEvent>(
				(event) => {
					if (!cancelled) {
						setForecast(event);
					}
				},
				{
					type: "weather/subscribe_forecast",
					forecast_type: forecastType,
					entity_id: entityId,
				},
			)
			.then((unsub) => {
				if (cancelled) {
					void unsub();
					return;
				}
				unsubscribe = unsub;
			})
			.catch((err: unknown) => {
				console.error("weather/subscribe_forecast failed", err);
			});

		return () => {
			cancelled = true;
			if (unsubscribe) {
				void unsubscribe();
			}
		};
	}, [connection, entityId, forecastType]);

	return forecast;
}
