const LOCALE = "en-AU";
export function renderTime() {
	return Intl.DateTimeFormat(LOCALE, {
		hour: "2-digit",
		minute: "2-digit",
	}).format();
}
export function renderDate() {
	return Intl.DateTimeFormat(LOCALE, {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "short",
	}).format();
}
