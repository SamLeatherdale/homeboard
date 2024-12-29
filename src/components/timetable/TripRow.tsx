import { styled } from "@linaria/react";
import { TPJourney } from "../../../trainboard/src/models/TripPlanner/custom/TPJourney.ts";
import { differenceInHoursAndMinutes, renderTime } from "../../lib/dateTime.ts";
import { TripIcon } from "./TripIcon.tsx";

export function TripRow({ trip: { legs } }: { trip: TPJourney }) {
	const [first] = legs;
	const last = legs[legs.length - 1];
	const departureEst = first.origin.departureTimeEstimated;
	const arrivalEst = last.destination.arrivalTimeEstimated;
	return (
		<Row>
			<TripIcon leg={first} />
			<TimeStack>
				<Time>
					{differenceInHoursAndMinutes(arrivalEst, departureEst, false)}
				</Time>
				<Time>{renderTime(arrivalEst)}</Time>
			</TimeStack>
		</Row>
	);
}

const Row = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
`;
const TimeStack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 3vh;
	border: 1px solid #ccc;
	//border-left: none;
	border-bottom-right-radius: 2vh;
	border-top-right-radius: 2vh;
`;
const Time = styled.time`
	font-size: 7.5vh;
`;
