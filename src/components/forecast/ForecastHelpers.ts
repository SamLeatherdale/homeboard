export class Rgb {
	r: number;
	g: number;
	b: number;

	constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	toRgbString(): string {
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
}

export function calculateBarRangePercents(
	minTemp: number,
	maxTemp: number,
	minTempDay: number,
	maxTempDay: number,
): { startPercent: number; endPercent: number } {
	if (maxTemp === minTemp) {
		// avoid division by 0
		return { startPercent: 0, endPercent: 100 };
	}
	const startPercent = (100 / (maxTemp - minTemp)) * (minTempDay - minTemp);
	const endPercent = (100 / (maxTemp - minTemp)) * (maxTempDay - minTemp);
	// fix floating point issue
	// (100 / (19 - 8)) * (19 - 8) = 100.00000000000001
	return {
		startPercent: Math.max(0, startPercent),
		endPercent: Math.min(100, endPercent),
	};
}
export function gradientRange(
	minTemp: number,
	maxTemp: number,
	gradientMap: Map<number, Rgb>,
): Rgb[] {
	const minVal = Math.max(roundDown(minTemp, 10), min([...gradientMap.keys()]));
	const maxVal = Math.min(roundUp(maxTemp, 10), max([...gradientMap.keys()]));
	return Array.from(gradientMap.keys())
		.filter((temp) => temp >= minVal && temp <= maxVal)

		.map((temp) => gradientMap.get(temp)!);
}

export function gradient(
	rgbs: Rgb[],
	fromPercent: number,
	toPercent: number,
): string {
	if (rgbs.length <= 1) {
		const rgb = rgbs[0] ?? new Rgb(255, 255, 255);
		return [rgb, rgb].map((rgb) => rgb.toRgbString()).join(",");
	}
	const [fromRgb, fromIndex] = calculateRgb(rgbs, fromPercent, "left");
	const [toRgb, toIndex] = calculateRgb(rgbs, toPercent, "right");
	const between = rgbs.slice(fromIndex + 1, toIndex);

	return [fromRgb, ...between, toRgb].map((rgb) => rgb.toRgbString()).join(",");
}

function calculateRgb(
	rgbs: Rgb[],
	percent: number,
	pickIndex: "left" | "right",
): [rgb: Rgb, index: number] {
	function valueAtPosition(
		start: number,
		end: number,
		percent: number,
	): number {
		const abs = Math.abs(start - end);
		const value = (abs / 100) * percent;
		if (start > end) {
			return round(start - value);
		} else {
			return round(start + value);
		}
	}

	function rgbAtPosition(
		startIndex: number,
		endIndex: number,
		percentToNextIndex: number,
		rgbs: Rgb[],
	): Rgb {
		const start = rgbs[startIndex];
		const end = rgbs[endIndex];
		const percent =
			percentToNextIndex < 0 ? 100 + percentToNextIndex : percentToNextIndex;
		const left = percentToNextIndex < 0 ? end : start;
		const right = percentToNextIndex < 0 ? start : end;
		const r = valueAtPosition(left.r, right.r, percent);
		const g = valueAtPosition(left.g, right.g, percent);
		const b = valueAtPosition(left.b, right.b, percent);
		return new Rgb(r, g, b);
	}

	const steps = 100 / (rgbs.length - 1);
	const step = percent / steps;
	const startIndex = Math.round(step);
	const percentToNextIndex = (100 / steps) * (percent - startIndex * steps);
	const endIndex =
		percentToNextIndex === 0
			? startIndex
			: percentToNextIndex < 0
				? startIndex - 1
				: startIndex + 1;
	const rgb = rgbAtPosition(startIndex, endIndex, percentToNextIndex, rgbs);
	const index =
		pickIndex === "left"
			? Math.min(startIndex, endIndex)
			: Math.max(startIndex, endIndex);
	return [rgb, index];
}

export function max(n: number[]): number {
	return Math.max(...n);
}

export function min(n: number[]): number {
	return Math.min(...n);
}

export function round(n: number, precision = 0): number {
	if (precision <= 0) {
		return Math.round(n);
	}
	return Math.ceil((n - precision / 2) / precision) * precision;
}

export function roundUp(n: number, precision: number = 0): number {
	if (precision <= 0) {
		return Math.ceil(n);
	}
	return Math.ceil(n / precision) * precision;
}

export function roundDown(n: number, precision = 0): number {
	if (precision <= 0) {
		return Math.floor(n);
	}
	return Math.floor(n / precision) * precision;
}
