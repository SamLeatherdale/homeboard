import { styled } from "@linaria/react";
import { ScreenBurnLine } from "react-screen-burn";
import "./App.css";
import DateTime from "./components/DateTime.tsx";
import Timetable from "./components/Timetable.tsx";
import Weather from "./components/Weather.tsx";
import HassProvider from "./hooks/HassProvider.tsx";

function App() {
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
