// create a hook for the home assistant client
import { HassConnect, useEntity, useHass } from "@hakit/core";
import { HassConfig } from "home-assistant-js-websocket";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { env } from "../env.ts";
import { useWeatherForecast } from "./useWeatherForecast.ts";

type HassContextType = {
	config?: HassConfig | null;
};

const HassContext = createContext<HassContextType>({
	config: null,
});
export const useConfig = () => useContext(HassContext).config;
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

function HassContextProvider({ children }: PropsWithChildren) {
	const { getConfig } = useHass();
	const [config, setConfig] = useState<HassConfig | null>(null);
	useEffect(() => {
		void (async () => {
			setConfig(await getConfig());
		})();
	}, []);
	return (
		<HassContext.Provider value={{ config }}>{children}</HassContext.Provider>
	);
}

export default function HassProvider({ children }: PropsWithChildren) {
	return (
		<HassConnect
			hassUrl={env.HASS_URL}
			hassToken={env.HASS_TOKEN}
			options={{
				allowNonSecure: true,
			}}
		>
			<HassContextProvider>{children}</HassContextProvider>
		</HassConnect>
	);
}
