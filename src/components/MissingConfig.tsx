import { styled } from "@linaria/react";

const required = [
	"VITE_HASS_URL",
	"VITE_ENTITY_WEATHER",
	"VITE_ENTITY_CLIMATE",
	"VITE_ORIGIN_STOP_ID",
	"VITE_DESTINATION_STOP_IDS",
];

export default function MissingConfig() {
	return (
		<Screen>
			<Title>Homeboard needs its configuration</Title>
			<p>
				This browser has no Home Assistant URL, weather and climate entities, or
				stop ids. Set them once, and this site remembers them.
			</p>
			<Heading>Required variables</Heading>
			<List>
				{required.map((name) => (
					<li key={name}>
						<code>{name}</code>
					</li>
				))}
			</List>
			<p>
				<code>VITE_HASS_TOKEN</code> is optional. Without it, Home Assistant
				asks for a login.
			</p>
			<Heading>How to set them</Heading>
			<Steps>
				<li>
					On a machine where the app is built with those variables (a local{" "}
					<code>.env.local</code>, or the Netlify production environment), open
					Homeboard. The address bar is rewritten to a URL whose hash contains
					the values, including the token when one was set.
				</li>
				<li>Copy that entire URL.</li>
				<li>
					Open it once in this browser. When this copy of Homeboard was not
					built with the variables, the hash is saved for this site in local
					storage (<code>homeboard_config</code>). Later visits of this same
					site use that saved copy. A build that already contains the variables
					uses those instead. A different site, such as a deploy preview, has
					its own storage and needs the URL opened there too.
				</li>
			</Steps>
		</Screen>
	);
}

const Screen = styled.main`
	box-sizing: border-box;
	width: 100%;
	height: 100vh;
	overflow: auto;
	padding: 4vh 6vw;
	font-size: 2.4vh;
	line-height: 1.45;
`;

const Title = styled.h1`
	margin: 0 0 2vh;
	font-size: 4.2vh;
	font-weight: 700;
`;

const Heading = styled.h2`
	margin: 3vh 0 1vh;
	font-size: 3vh;
	font-weight: 700;
`;

const List = styled.ul`
	margin: 0;
	padding-left: 1.2em;
`;

const Steps = styled.ol`
	margin: 0;
	padding-left: 1.2em;
`;
