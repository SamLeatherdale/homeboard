module.exports = {
	"*.{js,jsx,ts,tsx}": "pnpm run lint:fix",
	"*.{js,jsx,ts,tsx,css,html,md}": "pnpm run prettier:fix",
	// Disable typecheck task until we can fix submodules issue
	// "*.{ts,tsx}": () => "pnpm run typecheck",
};
