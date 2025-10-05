import { styled } from "@linaria/react";
import { useEffect } from "react";

export function Loader() {
	return <LoaderStyled>Loading...</LoaderStyled>;
}
export function LoaderError({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		setTimeout(() => {
			location.reload();
		}, 5000);
	}, []);
	return <ErrorStyled>Failed to load: {children}</ErrorStyled>;
}

export const LoaderStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
	font-size: 10vh;
`;
const ErrorStyled = styled(LoaderStyled)`
	color: red;
`;
