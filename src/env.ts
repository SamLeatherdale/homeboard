import { EntityName, type FilterByDomain } from "@hakit/core";

interface EnvConfig {
	HASS_URL: string;
	ENTITY_WEATHER: FilterByDomain<EntityName, "weather">;
	ENTITY_CLIMATE: FilterByDomain<EntityName, "climate">;
	ORIGIN_STOP_ID: string;
	DESTINATION_STOP_IDS: string[];
}

const envKeys = [
	"HASS_URL",
	"ENTITY_WEATHER",
	"ENTITY_CLIMATE",
	"ORIGIN_STOP_ID",
	"DESTINATION_STOP_IDS",
];

const STORAGE_KEY = "homeboard_config";

function validateEnv(env: Record<string, unknown>) {
	return envKeys.every((key) => env[key]);
}

function getConfigFromEnv() {
	const env = Object.fromEntries(
		Object.entries(import.meta.env as Record<string, string>)
			.map(([key, value]) => [key.replace("VITE_", ""), value])
			.filter(([key]) => envKeys.includes(key)),
	) as Record<string, string>;
	return validateEnv(env) ? env : null;
}

function getConfigFromUrl() {
	const env = Object.fromEntries(new URLSearchParams(location.hash.slice(1)));
	if (!validateEnv(env)) return null;

	saveConfigToStorage(env);
	return env;
}

export function getEnvAsQueryParams() {
	return new URLSearchParams(getConfigFromEnv() || {});
}

function getConfigFromStorage() {
	const rawEnv = localStorage.getItem(STORAGE_KEY);
	if (!rawEnv) return null;

	const env = JSON.parse(rawEnv) as Record<string, string>;
	return validateEnv(env) ? env : null;
}

function saveConfigToStorage(env: Record<string, string>) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(env));
}

function getEnv(): EnvConfig {
	const env =
		getConfigFromEnv() || getConfigFromUrl() || getConfigFromStorage();
	if (!env) throw new Error("Invalid env configuration");
	return {
		...env,
		DESTINATION_STOP_IDS: env.DESTINATION_STOP_IDS.split(","),
	};
}

export const env = getEnv();
