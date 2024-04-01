module.exports = {
	"*.{js,jsx,ts,tsx}": "npm run lint:fix",
	"*.{js,jsx,ts,tsx,css,html,md}": "npm run prettier:fix",
	// Disable typecheck task until we can fix submodules issue
	// "*.{ts,tsx}": () => "npm run typecheck",
};
