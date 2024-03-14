import { styled } from "@linaria/react";
import { renderDate, renderTime } from "../lib/dateTime.ts";
import { CenterCard } from "./Card.tsx";
import { useEffect, useState } from "react";

export default function DateTime() {
	const [time, setTime] = useState(new Date());
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<CenterCard>
			<StyledTime>{renderTime(time).replace(/\s/, "")}</StyledTime>
			<StyledDate>{renderDate(time)}</StyledDate>
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
