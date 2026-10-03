import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import { type Plugin, defineConfig } from "vite";
import analyzer from "vite-bundle-analyzer";
import { VitePWA } from "vite-plugin-pwa";

const HAKIT_LOCALE_STUB = "\0hakit-locale-stub";

// @hakit/core dynamically imports every Home Assistant locale. Only `en` is
// requested (see HassProvider). Point the rest at one empty module so the
// production build does not emit a chunk per language.
function hakitLocaleStub(): Plugin {
	return {
		name: "hakit-locale-stub",
		apply: "build",
		enforce: "pre",
		resolveId(source, importer) {
			if (
				!importer?.includes("@hakit/core") ||
				!importer.includes("/useLocale/locales/")
			) {
				return null;
			}
			const match = source.match(/^\.\/([^/]+)\/\1\.js$/);
			if (!match || match[1] === "en") return null;
			return HAKIT_LOCALE_STUB;
		},
		load(id) {
			if (id === HAKIT_LOCALE_STUB) return "export default {};";
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [
		hakitLocaleStub(),
		react(),
		wyw({
			include: ["**/*.{ts,tsx}"],
			exclude: ["lovelace-horizon-card/**/*"],
		}),
		mode === "analyze" &&
			analyzer({
				analyzerMode: "static",
				// Outputs to dist/stats.html
				fileName: "stats",
			}),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: false,
			manifest: false,
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg}"],
				runtimeCaching: [
					{
						urlPattern: ({ url }) =>
							url.origin === "https://fonts.googleapis.com" ||
							url.origin === "https://fonts.gstatic.com",
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts",
							cacheableResponse: { statuses: [0, 200] },
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
						},
					},
				],
			},
		}),
	],
}));
