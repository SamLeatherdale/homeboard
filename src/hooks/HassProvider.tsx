// create a hook for the home assistant client
import { HassConnect, useEntity, useHass, useWeather } from "@hakit/core";
import { HassConfig } from "home-assistant-js-websocket";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { LoaderError } from "../components/Loader.tsx";
import { env } from "../env.ts";

type HassContextType = {
	config?: HassConfig | null;
};

const HassContext = createContext<HassContextType>({
	config: null,
});
export const useConfig = () => useContext(HassContext).config;
export const useWeatherEntity = () => useWeather(env.ENTITY_WEATHER);
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
			options={{
				renderError: (error) => <LoaderError>{error}</LoaderError>,
				handleResumeOptions: {
					onStatusChange: (status) => {
						console.log("Connection status:", status);
					},
				},
			}}
		>
			<HassContextProvider>{children}</HassContextProvider>
		</HassConnect>
	);
}
