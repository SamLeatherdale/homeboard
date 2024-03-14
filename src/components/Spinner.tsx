import { styled } from "@linaria/react";

export const Spinner = styled.div`
	border-width: var(--spinner-width);
	border-style: solid;
	border-color: var(--spinner-color) var(--spinner-color) var(--spinner-color)
		transparent;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	animation: spin 1.5s infinite;
	position: relative;

	margin: 6em auto;

	&:before,
	&:after {
		content: "";
		width: var(--spinner-width);
		height: var(--spinner-width);
		border-radius: 50%;
		background: var(--spinner-color);
		position: absolute;
		left: var(--spinner-width);
	}

	&:before {
		top: var(--spinner-width);
	}

	&:after {
		bottom: var(--spinner-width);
	}

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
`;
