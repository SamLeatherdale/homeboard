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
