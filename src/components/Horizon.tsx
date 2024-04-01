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
import { useHass } from "../hooks/HassProvider.tsx";
import { Spinner } from "./Spinner.tsx";

const HorizonWrapper = createComponent({
	react: React,
	tagName: "horizon-card",
	elementClass: HorizonCard,
});
export default function Horizon() {
	const { config } = useHass();

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
				sunrise: true,
				sunset: true,
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

	return (
		<Wrapper>
			<HorizonWrapper ref={ref} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
`;
