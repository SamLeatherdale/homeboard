import { styled } from "@linaria/react";

export function Loader() {
	return <LoaderStyled>Loading...</LoaderStyled>;
}

export const LoaderStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	font-size: 10vh;
`;
