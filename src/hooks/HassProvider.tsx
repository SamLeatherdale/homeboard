// create a hook for the home assistant client
import {
	createConnection,
	createLongLivedTokenAuth,
	HassEntity,
	subscribeEntities,
} from "home-assistant-js-websocket";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { env } from "../env.ts";
import { ClimateEntity, WeatherEntity } from "../types/Entities.ts";

type HassContextType = {
	climate: ClimateEntity;
	sun: HassEntity;
	weather: WeatherEntity;
};

const HassContext = createContext<HassContextType | undefined>(undefined);
export const useHass = () => useContext(HassContext);

export default function HassProvider({ children }: PropsWithChildren) {
	const [entityState, setEntityState] = useState<HassContextType | undefined>();
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
		})();
	}, []);

	const value = useMemo(
		() => entityState,
		[
			entityState?.climate.last_updated,
			entityState?.sun.last_updated,
			entityState?.weather.last_updated,
		],
	);

	return <HassContext.Provider value={value}>{children}</HassContext.Provider>;
}
