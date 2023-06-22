import { formatMs } from "./time";

type FormatArgs = Record<string, unknown>;

export function str<T extends FormatArgs>(format: string, args: T): string {
	return format.replace(/{([^}]+)}/g, (match, key) => {
		return args[key] !== undefined ? String(args[key]) : match;
	});
}

export function fromTime(time: number) {
	return str("job done in {time}", {
		time: formatMs(time)
	});
}
