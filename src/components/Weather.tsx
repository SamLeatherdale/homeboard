import { styled } from "@linaria/react";
import {
	useClimateEntity,
	useSunEntity,
	useWeatherEntity,
} from "../hooks/HassProvider.tsx";
import { startOfDay } from "../lib/dateTime.ts";
import { getWeatherIcon } from "../lib/weatherIcons.ts";
import { MergedWeatherForecast } from "../types/Entities.ts";
import { Card } from "./Card.tsx";
import { Spinner } from "./Spinner.tsx";
import { WeeklyForecast } from "./forecast/WeatherForecast.tsx";

export default function Weather() {
	const climate = useClimateEntity();
	const sun = useSunEntity();
	const weather = useWeatherEntity();

	const {
		attributes: { current_temperature: indoorTemp },
	} = climate;
	const {
		attributes: { temperature: outdoorTemp, temperature_unit: tempUnit },
		forecast,
	} = weather;

	if (!forecast || !outdoorTemp) {
		return <Spinner />;
	}

	return (
		<Card>
			<CurrentWeather>
				<WeatherIcon image={getWeatherIcon(weather.state, sun)} />
				<WeatherStack>
					<Temp>
						{indoorTemp}
						{tempUnit}
					</Temp>
					<Emoji>🏠</Emoji>
					<Temp>
						{outdoorTemp}
						{tempUnit}
					</Temp>
					<Emoji>🏞️</Emoji>
				</WeatherStack>
			</CurrentWeather>
			<Forecast>
				<WeeklyForecast
					forecasts={forecast.forecast
						.map(
							(forecast): MergedWeatherForecast => ({
								temperature: forecast.temperature,
								templow: forecast.templow!,
								condition: forecast.condition!,
								datetime: new Date(forecast.datetime),
							}),
						)
						.filter((forecast) => forecast.datetime > startOfDay())
						.slice(0, 5)}
					currentTemp={outdoorTemp}
				/>
			</Forecast>
		</Card>
	);
}

const CurrentWeather = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
`;
const WeatherIcon = styled.div<{ image: string }>`
	width: 40vh;
	height: 40vh;
	background-image: ${(props) => `url("${props.image}")`};
	background-size: 125%;
	background-position: center;
`;

const WeatherStack = styled.div`
	font-size: 12vh;
	display: grid;
	grid-template-columns: 1fr auto;
	column-gap: 4vh;
	flex-direction: column;
	align-items: center;
`;
const Emoji = styled.span`
	font-size: 8vh;
`;
const Temp = styled.span`
	display: inline-block;
	min-width: 20vh;
	text-align: right;
`;

const Forecast = styled.div`
	padding-left: 2rem;
`;
