import { MergedWeatherForecast } from "../../types/Entities.ts";
import { styled } from "@linaria/react";
import { getWeatherIcon } from "../../lib/weatherIcons.ts";
import {
	calculateBarRangePercents,
	gradient,
	gradientRange,
	max,
	min,
	Rgb,
} from "./ForecastHelpers.ts";
import { renderWeekday } from "../../lib/dateTime.ts";

/**
 * This component is copied and adapted from clock-weather-card
 * @see https://github.com/pkissling/clock-weather-card/blob/master/src/clock-weather-card.ts
 */
export function WeeklyForecast({
	forecasts,
	currentTemp,
	hourly = false,
}: {
	forecasts: MergedWeatherForecast[];
	currentTemp: number;
	hourly?: boolean;
}) {
	const minTemps = forecasts.map((f) => f.templow);
	const maxTemps = forecasts.map((f) => f.temperature);
	minTemps.push(currentTemp);
	maxTemps.push(currentTemp);
	const minTemp = Math.round(min(minTemps));
	const maxTemp = Math.round(max(maxTemps));

	const calcGradientRange = gradientRange(minTemp, maxTemp, gradientMap);

	return forecasts.map((forecast) => (
		<ForecastItem
			key={forecast.datetime.toISOString()}
			{...{
				forecast,
				gradientRange: calcGradientRange,
				minTemp,
				maxTemp,
				currentTemp,
				hourly,
			}}
		/>
	));
}

const gradientMap: Map<number, Rgb> = new Map<number, Rgb>()
	.set(-20, new Rgb(0, 60, 98)) // dark blue
	.set(-10, new Rgb(120, 162, 204)) // darker blue
	.set(0, new Rgb(164, 195, 210)) // light blue
	.set(10, new Rgb(121, 210, 179)) // turquoise
	.set(20, new Rgb(252, 245, 112)) // yellow
	.set(30, new Rgb(255, 150, 79)) // orange
	.set(40, new Rgb(255, 192, 159)); // red

function ForecastItem({
	forecast,
	gradientRange,
	minTemp,
	maxTemp,
	currentTemp,
	hourly,
}: {
	forecast: MergedWeatherForecast;
	gradientRange: Rgb[];
	minTemp: number;
	maxTemp: number;
	currentTemp: number | null;
	hourly: boolean;
}) {
	const weatherState =
		forecast.condition === "pouring"
			? "raindrops"
			: forecast.condition === "rainy"
				? "raindrop"
				: forecast.condition;
	const weatherIcon = getWeatherIcon(weatherState, true, "static");

	const isNow = hourly
		? new Date().getHours() === forecast.datetime.getHours()
		: new Date().getDay() === forecast.datetime.getDay();

	const minTempDay = Math.round(
		isNow && currentTemp !== null
			? Math.min(currentTemp, forecast.templow)
			: forecast.templow,
	);
	const maxTempDay = Math.round(
		isNow && currentTemp !== null
			? Math.max(currentTemp, forecast.temperature)
			: forecast.temperature,
	);

	return (
		<Day>
			<SmallTemp>{renderWeekday(forecast.datetime)}</SmallTemp>
			<SmallIcon src={weatherIcon} alt={weatherState} />
			<SmallTemp>{minTempDay}</SmallTemp>
			<TemperatureBar
				{...{
					gradientRange,
					minTemp,
					maxTemp,
					minTempDay,
					maxTempDay,
					isNow,
					currentTemp,
				}}
			/>
			<SmallTemp>{maxTempDay}</SmallTemp>
		</Day>
	);
}

const Day = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
`;
const SmallIcon = styled.img`
	width: 10vh;
	height: 10vh;
`;

const SmallTemp = styled.span`
	font-size: 5vh;
	min-width: 6vh;
	text-align: right;
`;

function TemperatureBar({
	gradientRange,
	minTemp,
	maxTemp,
	minTempDay,
	maxTempDay,
	isNow,
	currentTemp,
}: {
	gradientRange: Rgb[];
	minTemp: number;
	maxTemp: number;
	minTempDay: number;
	maxTempDay: number;
	isNow: boolean;
	currentTemp: number | null;
}) {
	const { startPercent, endPercent } = calculateBarRangePercents(
		minTemp,
		maxTemp,
		minTempDay,
		maxTempDay,
	);
	const moveRight =
		maxTemp === minTemp ? 0 : (minTempDay - minTemp) / (maxTemp - minTemp);
	return (
		<TempBar>
			<TempBarBackground />
			<TempBarRange
				{...{
					moveRight,
					startPercent: `${startPercent}%`,
					endPercent: `${endPercent}%`,
					gradient: gradient(gradientRange, startPercent, endPercent),
				}}
			>
				{isNow ? (
					<ForecastCurrentTemp {...{ minTempDay, maxTempDay, currentTemp }} />
				) : (
					""
				)}
			</TempBarRange>
		</TempBar>
	);
}

const TempBarBackground = styled.div`
	left: 0;
	right: 100%;
	width: 100%;
	opacity: 0.25;
	background: var(--bar-background);
`;

const TempBarRange = styled.div<{
	moveRight: number;
	startPercent: string;
	endPercent: string;
	gradient: string;
}>`
	border-radius: calc(var(--bar-height) / 2);
	left: ${(props) => props.startPercent};
	right: calc(100% - ${(props) => props.endPercent});
	background: linear-gradient(to right, ${(props) => props.gradient});
	overflow: hidden;
	min-width: var(--bar-height);
	margin-left: calc(${(props) => props.moveRight} * -1 * var(--bar-height));
`;

function ForecastCurrentTemp({
	minTempDay,
	maxTempDay,
	currentTemp,
}: {
	minTempDay: number;
	maxTempDay: number;
	currentTemp: number | null;
}) {
	if (currentTemp == null) {
		return "";
	}
	const indicatorPosition =
		minTempDay === maxTempDay
			? 0
			: (100 / (maxTempDay - minTempDay)) * (currentTemp - minTempDay);
	const steps = maxTempDay - minTempDay;
	const moveRight =
		maxTempDay === minTempDay ? 0 : (currentTemp - minTempDay) / steps;
	return (
		<CurrentIndicator position={`${indicatorPosition}%`}>
			<CurrentIndicatorDot moveRight={moveRight} />
		</CurrentIndicator>
	);
}

const CurrentIndicator = styled.span<{ position: string }>`
	opacity: 0.75;
	left: ${(props) => props.position};
`;
const CurrentIndicatorDot = styled.span<{ moveRight: number }>`
	background-color: var(--indicator-dot);
	border-radius: 50%;
	width: var(--bar-height);
	box-shadow: inset 0 0 0 2px var(--indicator-dot-shadow);
	margin-left: calc(${(props) => props.moveRight} * -1 * var(--bar-height));
`;

const TempBar = styled.div`
	position: relative;
	width: 100%;
	height: var(--bar-height);
	border-radius: calc(var(--bar-height) / 2);
	overflow: hidden;

	${TempBarBackground}, ${TempBarRange}, ${CurrentIndicator}, ${CurrentIndicatorDot} {
		height: 100%;
		position: absolute;
	}
`;
