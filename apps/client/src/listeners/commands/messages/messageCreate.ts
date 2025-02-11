import { attachments } from "../../../lib/cache";
import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import type { Message } from "discord.js";

@ApplyOptions<Listener.Options>({})
export class UserEvent extends Listener<typeof Events.MessageCreate> {
	public override run(message: Message) {
		if (message.attachments.size > 0)
			attachments.set(
				message.channelId,
				message.attachments.first()?.proxyURL!
			);
	}
}
