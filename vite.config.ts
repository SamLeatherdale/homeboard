import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import analyzer from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
	},
	resolve: {
		dedupe: ["react", "react-dom"],
	},
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
		analyzer({
			analyzerMode: "static",
			// Outputs to dist/stats.html
			fileName: "stats",
		}),
	],
});
