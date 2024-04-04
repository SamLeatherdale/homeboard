import { ForecastAttribute } from "@hakit/core";

export type MergedWeatherForecast = Pick<
	Required<ForecastAttribute>,
	"temperature" | "templow" | "condition"
> & {
	datetime: Date;
};

export type SunAttributes = {
	next_dawn: string;
	next_dusk: string;
	next_midnight: string;
	next_noon: string;
	next_rising: string;
	next_setting: string;
	elevation: number;
	azimuth: number;
	rising: boolean;
	friendly_name: string;
	icon: string;
};
