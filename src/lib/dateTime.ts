const LOCALE = "en-AU";
export function renderTime(date: Date = new Date()) {
	return renderTimeWithSuffix(date).replace(/[ap]m/, "");
}
export function renderTimeWithSuffix(date: Date = new Date()) {
	return Intl.DateTimeFormat(LOCALE, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(date);
}
export function renderDate(date: Date = new Date()) {
	return Intl.DateTimeFormat(LOCALE, {
		month: "long",
		day: "numeric",
		weekday: "short",
	}).format(date);
}

export function renderWeekday(date: Date = new Date()) {
	return Intl.DateTimeFormat(LOCALE, {
		weekday: "short",
	}).format(date);
}

export function startOfDay(date: Date = new Date()) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
