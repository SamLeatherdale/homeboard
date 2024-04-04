import { styled } from "@linaria/react";
import { createComponent } from "@lit/react";
import {
	FrontendLocaleData,
	NumberFormat,
	TimeFormat,
} from "custom-card-helpers";
import * as React from "react";
import { useEffect, useRef } from "react";
import { HorizonCard } from "../../lovelace-horizon-card/src/components/horizonCard";
import { useConfig, useSunEntity } from "../hooks/HassProvider.tsx";
import { renderTimeWithSuffix } from "../lib/dateTime.ts";
import { SunAttributes } from "../types/Entities.ts";
import { Spinner } from "./Spinner.tsx";

export default function Horizon() {
	const sun = useSunEntity();
	const attributes = sun.attributes as SunAttributes;
	const labels = {
		next_dusk: "Dusk",
		next_dawn: "Dawn",
		next_rising: "Sunrise",
		next_setting: "Sunset",
	} satisfies Partial<Record<keyof SunAttributes, string>>;

	const [{ key, time }] = Object.entries(attributes)
		.filter((entry): entry is [keyof typeof labels, string] => {
			const [key, value] = entry;
			return key in labels && typeof value === "string";
		})
		.map(([key, value]) => ({
			key,
			time: new Date(value),
		}))
		.filter(({ time }) => time > new Date())
		.sort((a, b) => a.time.getTime() - b.time.getTime());

	return (
		<Wrapper>
			<HorizonGraph />
			<NextSolarEvent>
				{labels[key]}: {renderTimeWithSuffix(time)}
			</NextSolarEvent>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	top: -8vh;
	display: flex;
	flex-direction: column;
	width: 100%;
`;
const NextSolarEvent = styled.time`
	font-size: 10vh;
	line-height: 0;
	text-align: center;
`;

const HorizonWrapper = createComponent({
	react: React,
	tagName: "horizon-card",
	elementClass: HorizonCard,
});
function HorizonGraph() {
	const config = useConfig();

	const ref = useRef<HorizonCard | null>(null);

	useEffect(() => {
		if (!ref.current || !config) {
			return;
		}
		const locale: FrontendLocaleData = {
			language: config.language,
			time_format: TimeFormat.am_pm,
			number_format: NumberFormat.comma_decimal,
		};
		// @ts-expect-error We don't have all the HASS fields
		ref.current.hass = {
			config,
			locale: {
				...locale,
			},
		};
		ref.current.setConfig({
			...config,
			...locale,
			type: "custom:horizon-card",
			southern_flip: false,
			dark_mode: true,
			moon: false,
			fields: {
				// Header labels
				sunrise: false,
				sunset: false,
				// Footer labels
				dawn: false,
				noon: false,
				dusk: false,
			},
		});
	}, [ref.current, config]);

	if (!config) {
		return <Spinner />;
	}

	return <HorizonWrapper ref={ref} />;
}
