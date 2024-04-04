import { typeSync } from "@hakit/core/sync";
import { config } from "dotenv-flow";

async function runner() {
	config();
	await typeSync({
		url: process.env.VITE_HASS_URL!,
		token: process.env.VITE_HASS_TOKEN!,
		outDir: "src/generated",
	});
}
void runner();
