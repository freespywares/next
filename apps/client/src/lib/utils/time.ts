import { Time } from "@sapphire/time-utilities";

export function formatMs(milliseconds: number): string {
	if (milliseconds < 1000) {
		return `${milliseconds}ms`;
	}

	const seconds = milliseconds / Time.Second;
	return `${seconds}s`;
}
