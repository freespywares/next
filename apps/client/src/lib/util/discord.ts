export function createTable(...args: readonly string[][]) {
	return `\`\`\`yaml\n${args
		.map(([key, value]) => `${key}: ${value}`)
		.join("\n")}\`\`\``;
}
