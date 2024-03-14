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
				<Icon src={getWeatherIcon(weather.state, sun)} alt={weather.state} />
				<WeatherStack>
					<Emoji>🏠</Emoji>
					<Temp>
						{indoorTemp}
						{tempUnit}
					</Temp>
					<Emoji>🏞️</Emoji>
					<Temp>
						{outdoorTemp}
						{tempUnit}
					</Temp>
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
	display: flex;
`;
const Icon = styled.img`
	width: 30vh;
	height: 30vh;
`;

const WeatherStack = styled.div`
	font-size: 10vh;
	display: grid;
	grid-template-columns: 30vh 1fr;
	flex-direction: column;
	justify-content: center;
`;
const Emoji = styled.span``;
const Temp = styled.span`
	display: inline-block;
	min-width: 20vh;
	text-align: right;
`;

const Forecast = styled.div`
	padding-left: 2rem;
`;
