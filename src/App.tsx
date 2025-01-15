import { styled } from "@linaria/react";
import { useEffect } from "react";
import { ScreenBurnLine } from "react-screen-burn";
import "./App.css";
import DateTime from "./components/DateTime.tsx";
import Timetable from "./components/Timetable.tsx";
import Weather from "./components/Weather.tsx";
import { getEnvAsQueryParams } from "./env.ts";
import HassProvider from "./hooks/HassProvider.tsx";

function App() {
	const envParams = getEnvAsQueryParams().toString();
	useEffect(() => {
		history.replaceState(null, "", `#${envParams}`);
	}, [envParams]);

	const MINUTE_MS = 60 * 1000;
	return (
		<HassProvider>
			<ScreenBurnLine
				colors={["#ff0000", "#00ff00", "#0000ff"]}
				triggerTime={10 * MINUTE_MS}
				retriggerTime={10 * MINUTE_MS}
				// @ts-expect-error Size is not a valid prop
				size={5}
			/>
			<MainRow>
				<Weather />
				<DateTime />
				<Timetable />
			</MainRow>
		</HassProvider>
	);
}

const MainRow = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 33%);
	width: 100%;
	height: 100vh;
`;

export default App;
