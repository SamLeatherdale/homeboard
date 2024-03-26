import { styled } from "@linaria/react";
import { env } from "../env.ts";

/**
 * To Iframe your Home Assistant dashboard you need to disable X_FRAME_OPTIONS in your Home Assistant configuration.
 * @see https://www.home-assistant.io/integrations/http/#use_x_frame_options
 */
export default function IFrame() {
	return <StyledIFrame src={`${env.HASS_URL}/raspberry-pi/horizon?kiosk`} />;
}
const StyledIFrame = styled.iframe`
	width: 100%;
	height: 70vh;
	border: none;
`;
