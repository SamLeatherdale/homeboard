import { useHass } from "../hooks/HassProvider.tsx";
import { getWeatherIcon } from "../lib/weatherIcons.ts";
import { Spinner } from "./Spinner.tsx";
import { styled } from "@linaria/react";
import { Card } from "./Card.tsx";
import { WeeklyForecast } from "./forecast/WeatherForecast.tsx";
import { startOfDay } from "../lib/dateTime.ts";

export default function Weather() {
	const entities = useHass();

	if (!entities) {
		return <Spinner />;
	}

	const { climate, sun, weather } = entities;
	const {
		attributes: { current_temperature: indoorTemp },
	} = climate;
	const {
		attributes: {
			temperature: outdoorTemp,
			temperature_unit: tempUnit,
			forecast,
		},
	} = weather;

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
					forecasts={forecast
						.map((forecast) => ({
							...forecast,
							datetime: new Date(forecast.datetime),
						}))
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
