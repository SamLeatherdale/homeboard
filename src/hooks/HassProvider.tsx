// create a hook for the home assistant client
import { HassConnect, useEntity, useHass } from "@hakit/core";
import { PropsWithChildren, useMemo } from "react";
import { LoaderError } from "../components/Loader.tsx";
import { env } from "../env.ts";
import { useWeatherForecast } from "./useWeatherForecast.ts";

export const useConfig = () => useHass((state) => state.config);
export const useWeatherEntity = () => {
	const entity = useEntity(env.ENTITY_WEATHER);
	const forecastEvent = useWeatherForecast(env.ENTITY_WEATHER, "daily");
	return useMemo(
		() => ({
			...entity,
			forecast:
				forecastEvent?.forecast && forecastEvent.forecast.length > 0
					? {
							forecast: forecastEvent.forecast,
							type: forecastEvent.type,
						}
					: null,
		}),
		[entity, forecastEvent],
	);
};
export const useClimateEntity = () => useEntity(env.ENTITY_CLIMATE);

export const useSunEntity = () => useEntity("sun.sun");

export default function HassProvider({ children }: PropsWithChildren) {
	return (
		<HassConnect
			hassUrl={env.HASS_URL}
			hassToken={env.HASS_TOKEN}
			options={{
				renderError: (error) => <LoaderError>{error}</LoaderError>,
				handleResumeOptions: {
					onStatusChange: (status) => {
						console.log("Connection status:", status);
					},
				},
			}}
		>
			{children}
		</HassConnect>
	);
}
