// create a hook for the home assistant client
import { HassConnect, useEntity, useHass } from "@hakit/core";
import { PropsWithChildren, useMemo } from "react";
import { LoaderError } from "../components/Loader.tsx";
import { requireEnv } from "../env.ts";
import { useWeatherForecast } from "./useWeatherForecast.ts";

export const useConfig = () => useHass((state) => state.config);
export const useWeatherEntity = () => {
	const { ENTITY_WEATHER } = requireEnv();
	const entity = useEntity(ENTITY_WEATHER);
	const forecastEvent = useWeatherForecast(ENTITY_WEATHER, "daily");
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
export const useClimateEntity = () => useEntity(requireEnv().ENTITY_CLIMATE);

export const useSunEntity = () => useEntity("sun.sun");

export default function HassProvider({ children }: PropsWithChildren) {
	const { HASS_URL, HASS_TOKEN } = requireEnv();
	return (
		<HassConnect
			hassUrl={HASS_URL}
			hassToken={HASS_TOKEN}
			options={{
				locale: "en",
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
