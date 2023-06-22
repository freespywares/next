type FormatArgs = Record<string, unknown>;

export function str<T extends FormatArgs>(format: string, args: T): string {
	return format.replace(/{([^}]+)}/g, (match, key) => {
		return args[key] !== undefined ? String(args[key]) : match;
	});
}
