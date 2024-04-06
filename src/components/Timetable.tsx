import { styled } from "@linaria/react";
import { Fragment, useEffect, useState } from "react";
import APIClient from "../../trainboard/src/classes/APIClient.ts";
import { TransportModeId } from "../../trainboard/src/classes/LineType.ts";
import { TripRequestResponse } from "../../trainboard/src/models/TripPlanner/tripRequestResponse.ts";
import { env } from "../env.ts";
import { parseDate } from "../lib/dateTime.ts";
import { CenterCard } from "./Card.tsx";
import { Spinner } from "./Spinner.tsx";
import { TripRow } from "./timetable/TripRow.tsx";

const DISPLAYED_TRIPS = 3;
export default function Timetable() {
	const [responses, setResponses] = useState<TripRequestResponse[]>();
	const [lastUpdate, setLastUpdate] = useState(new Date());
	useEffect(() => {
		async function updateTimetable() {
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
		return <Spinner />;
	}

	return (
		<TripsCard>
			{responses.map((response, i) => {
				const [first] = response.journeys;
				const { legs } = first;
				const lastLeg = legs[legs.length - 1];
				return (
					<Fragment key={`${i}-${lastUpdate.toISOString()}`}>
						<Title>{getTitle(lastLeg.destination.name)}</Title>
						<TripList response={response} />
					</Fragment>
				);
			})}
		</TripsCard>
	);
}

const TripsCard = styled(CenterCard)`
	--trip-height: 25vh;
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: repeat(2, 50%);
	grid-template-rows: auto repeat(${DISPLAYED_TRIPS}, var(--trip-height));
	grid-gap: 2vh;
`;

function TripList({
	response: { journeys },
}: {
	response: TripRequestResponse;
}) {
	return (
		<>
			{journeys
				.filter(
					(journey) =>
						parseDate(journey.legs[0].origin.departureTimeEstimated) >
						new Date(),
				)
				.slice(0, DISPLAYED_TRIPS)
				.map((journey, i) => (
					<TripRow
						key={journey.legs
							.map((leg) => leg.transportation?.id || "none")
							.concat([i.toString()])
							.join(";")}
						trip={journey}
					/>
				))}
		</>
	);
}

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
