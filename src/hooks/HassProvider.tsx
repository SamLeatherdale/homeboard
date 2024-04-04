// create a hook for the home assistant client
import {
	Connection,
	HassConfig,
	HassEntity,
	callService,
	configColl,
	createConnection,
	createLongLivedTokenAuth,
	servicesColl,
	subscribeConfig,
	subscribeEntities,
	subscribeServices,
} from "home-assistant-js-websocket";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { env } from "../env.ts";
import { ClimateEntity, WeatherEntity } from "../types/Entities.ts";

type HassEntities = {
	climate: ClimateEntity;
	sun: HassEntity;
	weather: WeatherEntity;
};

type HassContextType = {
	entities?: HassEntities;
	config?: HassConfig;
};

const HassContext = createContext<HassContextType>({
	entities: undefined,
	config: undefined,
});
export const useHass = () => useContext(HassContext);

export default function HassProvider({ children }: PropsWithChildren) {
	const [entityState, setEntityState] = useState<HassEntities | undefined>();
	const [config, setConfig] = useState<HassConfig | undefined>();

	async function getForecast(conn: Connection) {
		const data = await callService(conn, "weather", "get_forecast", {
			type: "daily",
			response: true,
		});
		console.log(data);
	}
	useEffect(() => {
		void (async () => {
			const auth = createLongLivedTokenAuth(env.HASS_URL, env.HASS_TOKEN);
			const conn = await createConnection({ auth });
			subscribeEntities(conn, (entities) => {
				setEntityState({
					climate: entities[env.ENTITY_CLIMATE] as ClimateEntity,
					sun: entities["sun.sun"],
					weather: entities[env.ENTITY_WEATHER] as WeatherEntity,
				});
			});

			subscribeConfig(conn, (config) => {
				setConfig(config);
			});

			const services = servicesColl(conn);
			await services.refresh();
			console.log(services.state.weather);

			void getForecast(conn);
			const HOUR_IN_MS = 60 * 60 * 1000;
			setInterval(getForecast, HOUR_IN_MS, conn);

			const config = configColl(conn);
			await config.refresh();
			setConfig(config.state);
		})();
	}, []);

	const value = useMemo(() => {
		const value: HassContextType = {
			entities: entityState,
			config,
		};
		// console.log(value);
		return value;
	}, [
		entityState?.climate.last_updated,
		entityState?.sun.last_updated,
		entityState?.weather.last_updated,
		config,
	]);

	return <HassContext.Provider value={value}>{children}</HassContext.Provider>;
}
