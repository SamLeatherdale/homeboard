import { HassEntityBase } from "home-assistant-js-websocket";

type GenericHassEntity<T extends Record<string, unknown>> = HassEntityBase & {
	attributes: T;
};

export type ClimateEntity = GenericHassEntity<{
	current_humidity: number;
	current_temperature: number;
	max_temp: number;
	min_temp: number;
	/** Target temperature */
	temperature: number;
}>;
export type SunEntity = GenericHassEntity<{
	azimuth: number;
	elevation: number;
	rising: boolean;
	next_dawn: string;
	next_dusk: string;
	next_midnight: string;
	next_noon: string;
	next_rising: string;
	next_setting: string;
	state: "above_horizon" | "below_horizon";
}>;
export type WeatherForecast = {
	datetime: string;
	condition: string;
	temperature: number;
	humidity?: number | null;
	precipitation: number | null;
	precipitation_probability: number | null;
	templow: number;
};

export type MergedWeatherForecast = Omit<WeatherForecast, "datetime"> & {
	datetime: Date;
};
export type WeatherEntity = GenericHassEntity<{
	temperature: number;
	temperature_unit: string;
	forecast: Array<WeatherForecast>;
}>;
