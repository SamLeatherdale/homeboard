import svgFillPartlyCloudyNightRain from "../icons/fill/svg/partly-cloudy-night-rain.svg";
import svgFillStaticPartlyCloudyNightRain from "../icons/fill/svg-static/partly-cloudy-night-rain.svg";
import svgFillPartlyCloudyDayRain from "../icons/fill/svg/partly-cloudy-day-rain.svg";
import svgFillStaticPartlyCloudyDayRain from "../icons/fill/svg-static/partly-cloudy-day-rain.svg";
import svgFillPartlyCloudyNight from "../icons/fill/svg/partly-cloudy-night.svg";
import svgFillStaticPartlyCloudyNight from "../icons/fill/svg-static/partly-cloudy-night.svg";
import svgFillPartlyCloudyDay from "../icons/fill/svg/partly-cloudy-day.svg";
import svgFillStaticPartlyCloudyDay from "../icons/fill/svg-static/partly-cloudy-day.svg";
import svgFillCloudy from "../icons/fill/svg/cloudy.svg";
import svgFillStaticCloudy from "../icons/fill/svg-static/cloudy.svg";
import svgFillClearNight from "../icons/fill/svg/clear-night.svg";
import svgFillStaticClearNight from "../icons/fill/svg-static/clear-night.svg";
import svgFillFogNight from "../icons/fill/svg/fog-night.svg";
import svgFillStaticFogNight from "../icons/fill/svg-static/fog-night.svg";
import svgFillFogDay from "../icons/fill/svg/fog-day.svg";
import svgFillStaticFogDay from "../icons/fill/svg-static/fog-day.svg";
import svgFillHail from "../icons/fill/svg/hail.svg";
import svgFillStaticHail from "../icons/fill/svg-static/hail.svg";
import svgFillThunderstormsNight from "../icons/fill/svg/thunderstorms-night.svg";
import svgFillStaticThunderstormsNight from "../icons/fill/svg-static/thunderstorms-night.svg";
import svgFillThunderstormsDay from "../icons/fill/svg/thunderstorms-day.svg";
import svgFillStaticThunderstormsDay from "../icons/fill/svg-static/thunderstorms-day.svg";
import svgFillThunderstormsRainNight from "../icons/fill/svg/thunderstorms-night-rain.svg";
import svgFillStaticThunderstormsRainNight from "../icons/fill/svg-static/thunderstorms-night-rain.svg";
import svgFillThunderstormsRainDay from "../icons/fill/svg/thunderstorms-day-rain.svg";
import svgFillStaticThunderstormsRainDay from "../icons/fill/svg-static/thunderstorms-day-rain.svg";
import svgFillRain from "../icons/fill/svg/rain.svg";
import svgFillStaticRain from "../icons/fill/svg-static/rain.svg";
import svgFillSnow from "../icons/fill/svg/snow.svg";
import svgFillStaticSnow from "../icons/fill/svg-static/snow.svg";
import svgFillSleet from "../icons/fill/svg/sleet.svg";
import svgFillStaticSleet from "../icons/fill/svg-static/sleet.svg";
import svgFillClearDay from "../icons/fill/svg/clear-day.svg";
import svgFillStaticClearDay from "../icons/fill/svg-static/clear-day.svg";
import svgFillWindsock from "../icons/fill/svg/windsock.svg";
import svgFillStaticWindsock from "../icons/fill/svg-static/windsock.svg";
import svgFillHurricane from "../icons/fill/svg/hurricane.svg";
import svgFillStaticHurricane from "../icons/fill/svg-static/hurricane.svg";
import svgFillStaticRaindrops from "../icons/fill/svg-static/raindrops.svg";
import svgFillRaindrops from "../icons/fill/svg/raindrops.svg";
import svgFillStaticRaindrop from "../icons/fill/svg-static/raindrop.svg";
import svgFillRaindrop from "../icons/fill/svg/raindrop.svg";
import { HassEntity } from "home-assistant-js-websocket";

export const svg = {
	fill: {
		rainy: {
			day: svgFillPartlyCloudyDayRain,
			night: svgFillPartlyCloudyNightRain,
		},
		partlycloudy: {
			day: svgFillPartlyCloudyDay,
			night: svgFillPartlyCloudyNight,
		},
		cloudy: svgFillCloudy,
		"clear-night": {
			day: svgFillClearDay,
			night: svgFillClearNight,
		},
		fog: {
			day: svgFillFogDay,
			night: svgFillFogNight,
		},
		hail: svgFillHail,
		lightning: {
			day: svgFillThunderstormsDay,
			night: svgFillThunderstormsNight,
		},
		"lightning-rainy": {
			day: svgFillThunderstormsRainDay,
			night: svgFillThunderstormsRainNight,
		},
		pouring: svgFillRain,
		raindrop: svgFillRaindrop,
		raindrops: svgFillRaindrops,
		snowy: svgFillSnow,
		"snowy-rainy": svgFillSleet,
		sunny: {
			day: svgFillClearDay,
			night: svgFillClearNight,
		},
		windy: svgFillWindsock,
		"windy-exceptional": svgFillWindsock,
		exceptional: svgFillHurricane,
	},
};

export const svgStatic = {
	fill: {
		rainy: {
			day: svgFillStaticPartlyCloudyDayRain,
			night: svgFillStaticPartlyCloudyNightRain,
		},
		partlycloudy: {
			day: svgFillStaticPartlyCloudyDay,
			night: svgFillStaticPartlyCloudyNight,
		},
		cloudy: svgFillStaticCloudy,
		"clear-night": {
			day: svgFillStaticClearDay,
			night: svgFillStaticClearNight,
		},
		fog: {
			day: svgFillStaticFogDay,
			night: svgFillStaticFogNight,
		},
		hail: svgFillStaticHail,
		lightning: {
			day: svgFillStaticThunderstormsDay,
			night: svgFillStaticThunderstormsNight,
		},
		"lightning-rainy": {
			day: svgFillStaticThunderstormsRainDay,
			night: svgFillStaticThunderstormsRainNight,
		},
		pouring: svgFillStaticRain,
		raindrop: svgFillStaticRaindrop,
		raindrops: svgFillStaticRaindrops,
		snowy: svgFillStaticSnow,
		"snowy-rainy": svgFillStaticSleet,
		sunny: {
			day: svgFillStaticClearDay,
			night: svgFillStaticClearNight,
		},
		windy: svgFillStaticWindsock,
		"windy-exceptional": svgFillStaticWindsock,
		exceptional: svgFillStaticHurricane,
	},
};

export function getWeatherIcon(
	weatherState: string,
	sun: HassEntity | true,
	kind: "static" | "animated" = "static",
): string {
	const daytime =
		typeof sun === "boolean"
			? "day"
			: sun.state === "below_horizon"
				? "night"
				: "day";
	const iconMap = kind === "animated" ? svg : svgStatic;
	const icon = iconMap["fill"][weatherState as keyof (typeof iconMap)["fill"]];
	return typeof icon === "string" ? icon : icon[daytime];
}
