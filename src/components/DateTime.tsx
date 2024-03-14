import { styled } from "@linaria/react";
import { renderDate, renderTime } from "../lib/dateTime.ts";
import { CenterCard } from "./Card.tsx";

export default function DateTime() {
	return (
		<CenterCard>
			<StyledTime>{renderTime()}</StyledTime>
			<StyledDate>{renderDate()}</StyledDate>
		</CenterCard>
	);
}
const StyledTime = styled.time`
	display: block;
	font-size: 25vh;
`;
const StyledDate = styled.time`
	display: block;
	font-size: 10vh;
`;
