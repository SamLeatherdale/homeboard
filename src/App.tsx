import "./App.css";
import DateTime from "./components/DateTime.tsx";
import { styled } from "@linaria/react";

function App() {
	return (
		<MainRow>
			<DateTime />
		</MainRow>
	);
}

const MainRow = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`;

export default App;
