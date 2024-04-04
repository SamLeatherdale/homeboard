import { EntityName, type FilterByDomain } from "@hakit/core";

export const env = {
	HASS_URL: import.meta.env.VITE_HASS_URL,
	HASS_TOKEN: import.meta.env.VITE_HASS_TOKEN,
	ENTITY_WEATHER: import.meta.env.VITE_ENTITY_WEATHER as FilterByDomain<
		EntityName,
		"weather"
	>,
	ENTITY_CLIMATE: import.meta.env.VITE_ENTITY_CLIMATE as FilterByDomain<
		EntityName,
		"climate"
	>,
};
