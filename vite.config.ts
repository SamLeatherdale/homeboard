import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [
					"@babel/plugin-proposal-class-properties",
					[
						"@babel/plugin-proposal-decorators",
						{
							version: "2018-09",
							decoratorsBeforeExport: true,
						},
					],
				],
			},
		}),
		wyw({
			include: ["**/*.{ts,tsx}"],
			exclude: ["lovelace-horizon-card/**/*"],
		}),
	],
});
