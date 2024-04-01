import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import { renderDate, renderTime } from "../lib/dateTime.ts";
import { CenterCard } from "./Card.tsx";
import Horizon from "./Horizon.tsx";

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
			<Horizon />
		</CenterCard>
	);
}
const StyledTime = styled.time`
	display: block;
	font-size: 25vh;
	line-height: 1.2;
`;
const StyledDate = styled.time`
	display: block;
	font-size: 10vh;
`;
