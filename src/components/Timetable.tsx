import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import APIClient from "../../trainboard/src/classes/APIClient.ts";
import { TransportModeId } from "../../trainboard/src/classes/LineType.ts";
import { TPJourney } from "../../trainboard/src/models/TripPlanner/custom/TPJourney.ts";
import { TPLeg } from "../../trainboard/src/models/TripPlanner/custom/TPLeg.ts";
import { TPResponse } from "../../trainboard/src/models/TripPlanner/custom/TPResponse.ts";
import { env } from "../env.ts";
import { CenterCard } from "./Card.tsx";
import { Loader } from "./Loader.tsx";
import { TripRow } from "./timetable/TripRow.tsx";

const DISPLAYED_TRIPS = 3;
export default function Timetable() {
	const [responses, setResponses] = useState<TPResponse[]>();
	const [lastUpdate, setLastUpdate] = useState(new Date());
	useEffect(() => {
		async function updateTimetable() {
			const client = new APIClient();
			const results = await Promise.all(
				env.DESTINATION_STOP_IDS.map(async (destinationId) => {
					const trips = await client.getTrips(
						env.ORIGIN_STOP_ID,
						destinationId,
						{
							tripCount: 10,
							excludedModes: [
								TransportModeId.Bus,
								TransportModeId.Coach,
								TransportModeId.SchoolBus,
								TransportModeId.Walking,
								TransportModeId.Ferry,
								TransportModeId.LightRail,
							],
						},
					);
					const realtime = await client.getGTFSRealtime(trips.journeys);
					return {
						...trips,
						journeys: realtime.filter((journey) => !journey.cancelStatus),
					};
				}),
			);
			setResponses(results);
			setLastUpdate(new Date());
		}

		void updateTimetable();
		const interval = window.setInterval(
			() => void updateTimetable(),
			60 * 1000,
		);
		return () => {
			window.clearInterval(interval);
		};
	}, []);
	if (!responses) {
		return <Loader />;
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
	--trip-height: 25vh;
	display: grid;
	grid-template-columns: repeat(2, 50%);
	grid-template-rows: auto repeat(${DISPLAYED_TRIPS}, var(--trip-height));
	grid-gap: 2vh;
`;

function TripList({ response: { journeys } }: { response: TPResponse }) {
	const [first] = journeys;
	const { legs } = first;
	const lastLeg = legs[legs.length - 1];
	const uniqueJourneys = journeys
		.filter(
			({ legs: [first] }) => first.origin.departureTimeEstimated > new Date(),
		)
		.reduce((map, journey) => {
			const [first] = journey.legs;
			const id = getLegId(first);
			if (!map.has(id)) {
				map.set(id, journey);
			}
			return map;
		}, new Map<string, TPJourney>());
	const filteredJourneys = [...uniqueJourneys.values()].slice(
		0,
		DISPLAYED_TRIPS,
	);
	return (
		<TripColumn>
			<Title>{getTitle(lastLeg.destination.name)}</Title>
			{filteredJourneys.map((journey, i) => (
				<TripRow
					key={journey.legs.map(getLegId).concat([i.toString()]).join(";")}
					trip={journey}
				/>
			))}
		</TripColumn>
	);
}

function getLegId(leg: TPLeg) {
	return (
		leg.transportation?.properties?.RealtimeTripId ||
		leg.transportation?.id ||
		"none"
	);
}

const TripColumn = styled.div`
	display: grid;
	grid-row: 1 / -1;
	grid-template-rows: subgrid;
`;

const Title = styled.h2`
	font-family: var(--font-sans);
	font-size: 7.5vh;
	margin: 0;
	text-align: center;
`;

function getTitle(name: string) {
	const [first] = name.split(",");
	return first.replace(" Station", "");
}
