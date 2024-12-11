import { styled } from "@linaria/react";
import { useRef, useState } from "react";

export function AudioPlayer({ src }: { src: string }) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [, setRender] = useState(0);

	const rerender = () => {
		setRender((r) => r + 1);
	};
	const handlePlay = () => {
		if (audioRef.current) {
			if (audioRef.current.paused) {
				void audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
			rerender();
		}
	};
	const playing = audioRef.current && !audioRef.current.paused;

	return (
		<>
			<Button onClick={handlePlay}>{playing ? "⏸️" : "▶️"}</Button>
			<audio
				ref={audioRef}
				src={src}
				onEnded={rerender}
				onPause={rerender}
				onPlay={rerender}
			/>
		</>
	);
}

const Button = styled.button`
	font-size: 2.5rem;
	appearance: none;
	background: none;
	border: none;
	margin-left: 1rem;
`;
