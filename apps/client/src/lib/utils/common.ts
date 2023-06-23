import { type Args } from "@sapphire/framework";
import { formatMs } from "./time";
import { cast } from "@sapphire/utilities";
import type { Message } from "discord.js";
import { attachments } from "../cache/attachment";

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

export function getCachedAttachment(message: Message) {
	return attachments.get(message.channelId) ?? null;
}

export async function getDiscordMedia(message: Message, args: Args) {
	const cachedAttachment = getCachedAttachment(message);
	const attachmentURL = await args.pick("string").catch(() => null);

	return attachmentURL ?? cachedAttachment?.proxyURL;
}
