/// <reference types="vite/client" />
interface ImportMetaEnv {
	VITE_HASS_URL: string;
	VITE_ENTITY_WEATHER: string;
	VITE_ENTITY_CLIMATE: string;
	VITE_ORIGIN_STOP_ID: string;
	VITE_DESTINATION_STOP_IDS: string;
}
