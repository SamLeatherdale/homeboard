import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import APIClient from "../../trainboard/src/classes/APIClient.ts";
import {
	TransportModeId,
	getLineType,
	getTransportMode,
	transportModes,
} from "../../trainboard/src/classes/LineType.ts";
import { TripRequestResponse } from "../../trainboard/src/models/TripPlanner/tripRequestResponse.ts";
import { TripRequestResponseJourney } from "../../trainboard/src/models/TripPlanner/tripRequestResponseJourney.ts";
import { TripRequestResponseJourneyLeg } from "../../trainboard/src/models/TripPlanner/tripRequestResponseJourneyLeg.ts";
import { env } from "../env.ts";
import {
	differenceInHoursAndMinutes,
	getRelativeFriendlyTime,
	parseDate,
	renderTime,
} from "../lib/dateTime.ts";
import { CenterCard } from "./Card.tsx";
import { Spinner } from "./Spinner.tsx";

export default function Timetable() {
	const [responses, setResponses] = useState<TripRequestResponse[]>();
	const [lastUpdate, setLastUpdate] = useState(new Date());
	useEffect(() => {
		void (async () => {
			const client = new APIClient();
			const results = await Promise.all(
				env.DESTINATION_STOP_IDS.map((destinationId) => {
					return client.getTrips(env.ORIGIN_STOP_ID, destinationId, {
						tripCount: 5,
						excludedModes: [
							TransportModeId.Bus,
							TransportModeId.Coach,
							TransportModeId.SchoolBus,
							TransportModeId.Walking,
							TransportModeId.Ferry,
							TransportModeId.LightRail,
						],
					});
				}),
			);
			setResponses(results);
			setLastUpdate(new Date());
		})();
	}, []);
	if (!responses) {
		return <Spinner />;
	}

	return (
		<TripsCard>
			{responses.map((response, i) => (
				<TripList
					key={`${i}-${lastUpdate.toISOString()}`}
					response={response}
				/>
			))}
		</TripsCard>
	);
}

const TripsCard = styled(CenterCard)`
	display: grid;
	grid-template-columns: repeat(2, 50%);
	grid-gap: 2vh;
`;

function TripList({
	response: { journeys },
}: {
	response: TripRequestResponse;
}) {
	const [first] = journeys;
	const { legs } = first;
	const lastLeg = legs[legs.length - 1];

	return (
		<TripStack>
			<Title>{getTitle(lastLeg.destination.name)}</Title>
			<Trips>
				{journeys
					.filter(
						(journey) =>
							parseDate(journey.legs[0].origin.departureTimeEstimated) >
							new Date(),
					)
					.slice(0, 4)
					.map((journey, i) => (
						<TripItem
							key={journey.legs
								.map((leg) => leg.transportation?.id || "none")
								.concat([i.toString()])
								.join(";")}
							trip={journey}
						/>
					))}
			</Trips>
		</TripStack>
	);
}

const TripStack = styled.div`
	display: flex;
	flex-direction: column;
`;
const Title = styled.h2`
	font-family: var(--font-sans);
	font-size: 7.5vh;
	margin: 0;
	text-align: center;
`;
const Trips = styled.ol`
	list-style: none;
	padding: 0;
`;

function getTitle(name: string) {
	const [first] = name.split(",");
	return first.replace(" Station", "");
}

function TripItem({ trip: { legs } }: { trip: TripRequestResponseJourney }) {
	const [first] = legs;
	const last = legs[legs.length - 1];
	const departureEst = parseDate(first.origin.departureTimeEstimated);
	const arrivalEst = parseDate(last.destination.arrivalTimeEstimated);
	return (
		<Row>
			<TripIcon leg={first} />
			<TimeStack>
				<Time>{differenceInHoursAndMinutes(arrivalEst, departureEst)}</Time>
				<Time>{renderTime(arrivalEst)}</Time>
			</TimeStack>
		</Row>
	);
}

const Row = styled.li`
	list-style: none;
	display: grid;
	grid-template-columns: auto 1fr;
`;
const TimeStack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 3vh;
	border: 1px solid #ccc;
	border-bottom-right-radius: 2vh;
	border-top-right-radius: 2vh;
`;
const Time = styled.time`
	font-size: 6vh;
`;

export function TripIcon({ leg }: { leg: TripRequestResponseJourneyLeg }) {
	const departureEst = parseDate(leg.origin.departureTimeEstimated);
	const tripName = leg.transportation?.disassembledName?.toUpperCase();
	const transportMode = getTransportMode(leg.transportation?.product?.iconId);

	const isTrain = transportMode?.id === TransportModeId.Train;
	let color = transportModes[TransportModeId.Walk].color;
	if (isTrain && tripName) {
		// eslint-disable-next-line
		color = getLineType(tripName).color;
	} else if (transportMode && tripName) {
		color = transportMode.color;
	}
	return (
		<TransportIcon color={color}>
			<span>{getRelativeFriendlyTime(departureEst)}</span>
		</TransportIcon>
	);
}

const TransportIcon = styled.div<{
	color: string;
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20vh;
	height: 20vh;
	font-size: 6vh;
	background-color: ${(props) => props.color};
	border-bottom-left-radius: 2vh;
	border-top-left-radius: 2vh;
`;
