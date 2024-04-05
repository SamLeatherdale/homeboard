import { EntityName, type FilterByDomain } from "@hakit/core";

export const env = {
	HASS_URL: import.meta.env.VITE_HASS_URL,
	ENTITY_WEATHER: import.meta.env.VITE_ENTITY_WEATHER as FilterByDomain<
		EntityName,
		"weather"
	>,
	ENTITY_CLIMATE: import.meta.env.VITE_ENTITY_CLIMATE as FilterByDomain<
		EntityName,
		"climate"
	>,
	ORIGIN_STOP_ID: import.meta.env.VITE_ORIGIN_STOP_ID,
	DESTINATION_STOP_IDS: import.meta.env.VITE_DESTINATION_STOP_IDS.split(","),
};
