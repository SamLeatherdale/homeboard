import { styled } from "@linaria/react";
import {
	TransportModeId,
	getLineType,
	getTransportMode,
	transportModes,
} from "../../../trainboard/src/classes/LineType.ts";
import { TripRequestResponseJourneyLeg } from "../../../trainboard/src/models/TripPlanner/tripRequestResponseJourneyLeg.ts";
import { getRelativeFriendlyTime, parseDate } from "../../lib/dateTime.ts";

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
			<DepartureTime>
				{getRelativeFriendlyTime(departureEst, new Date(), true)}
			</DepartureTime>
		</TransportIcon>
	);
}

const TransportIcon = styled.div<{
	color: string;
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--trip-height);
	height: var(--trip-height);
	background-color: ${(props) => props.color};
	border-bottom-left-radius: 2vh;
	border-top-left-radius: 2vh;
`;
const DepartureTime = styled.time`
	font-size: 10vh;
`;
