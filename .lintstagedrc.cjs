module.exports = {
	"*.{js,jsx,ts,tsx}": "npm run lint:fix",
	"*.{js,jsx,ts,tsx,css,html,md}": "npm run prettier:fix",
	"*.{ts,tsx}": () => "npm run typecheck",
};
