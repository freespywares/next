import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
import { attachments } from "../../lib/cache/attachment";

@ApplyOptions<Listener.Options>({})
export class UserEvent extends Listener<typeof Events.MessageCreate> {
	public override run(message: Message) {
		if (message.channel.isDMBased()) return;

		if (message.attachments.size > 0) {
			attachments.set(message.channelId, message.attachments.first()!);
		}

		if (message.embeds.length > 0) {
			attachments.set(message.channelId, message.embeds[0].image!);
		}
	}
}
