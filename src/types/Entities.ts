import { ForecastAttribute } from "@hakit/core";

export type MergedWeatherForecast = Pick<
	Required<ForecastAttribute>,
	"temperature" | "templow" | "condition"
> & {
	datetime: Date;
};
