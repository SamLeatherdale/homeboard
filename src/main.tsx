import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";
import "./theme.css";

const updateIntervalMs = 60 * 60 * 1000;

registerSW({
	immediate: true,
	onRegisteredSW(swUrl, registration) {
		if (!registration) return;
		setInterval(async () => {
			if (!navigator.onLine) return;
			try {
				const resp = await fetch(swUrl, { cache: "no-store" });
				if (resp.ok) await registration.update();
			} catch {
				// Shell is already on screen; try again next interval.
			}
		}, updateIntervalMs);
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
