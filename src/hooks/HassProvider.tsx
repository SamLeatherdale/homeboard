// create a hook for the home assistant client
import { HassConnect, useEntity, useHass, useWeather } from "@hakit/core";
import { PropsWithChildren } from "react";
import { LoaderError } from "../components/Loader.tsx";
import { env } from "../env.ts";

export const useConfig = () => useHass((state) => state.config);
export const useWeatherEntity = () => useWeather(env.ENTITY_WEATHER);
export const useClimateEntity = () => useEntity(env.ENTITY_CLIMATE);

export const useSunEntity = () => useEntity("sun.sun");

export default function HassProvider({ children }: PropsWithChildren) {
	return (
		<HassConnect
			hassUrl={env.HASS_URL}
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
