import { formatMs } from "./time";
import { cast } from "@sapphire/utilities";

type FormatArgs = Record<string, unknown>;

export function str<T extends FormatArgs>(format: string, args: T): string {
	return format.replace(/{([^}]+)}/g, (match, key) => {
		return args[key] !== undefined ? String(args[key]) : match;
	});
}

export function fromTime(time: string | number) {
	return str("job done in {time}", {
		time: formatMs(cast<number>(time))
	});
}
