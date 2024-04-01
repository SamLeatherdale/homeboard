// create a hook for the home assistant client
import {
	HassConfig,
	HassEntity,
	configColl,
	createConnection,
	createLongLivedTokenAuth,
	subscribeConfig,
	subscribeEntities,
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

			const config = configColl(conn);
			await config.refresh();
			console.log(config.state);
			setConfig(config.state);
		})();
	}, []);

	const value: HassContextType = useMemo(
		() => ({
			entities: entityState,
			config,
		}),
		[
			entityState?.climate.last_updated,
			entityState?.sun.last_updated,
			entityState?.weather.last_updated,
		],
	);

	return <HassContext.Provider value={value}>{children}</HassContext.Provider>;
}
