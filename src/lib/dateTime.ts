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

export function parseDate(date: string) {
	return new Date(date);
}

export function getRelativeFriendlyTime(time: Date, to: Date = new Date()) {
	if (differenceInMinutes(time, to) === 0) {
		return "now";
	}
	return differenceInHoursAndMinutes(time, to);
}

function differenceInMinutes(time: Date, to: Date) {
	return Math.floor((time.getTime() - to.getTime()) / 60000);
}
export function differenceInHoursAndMinutes(time: Date, to: Date) {
	const diff = differenceInMinutes(time, to);
	const hours = Math.floor(diff / 60);
	const minutes = diff % 60;
	if (hours === 0) {
		return `${minutes}m`;
	}
	return `${hours}h${minutes}m`;
}
