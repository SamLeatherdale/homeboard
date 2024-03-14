import { styled } from "@linaria/react";

export const Card = styled.section`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border: 1px solid var(--color-border);
`;
export const CenterCard = styled(Card)`
	align-items: center;
`;
