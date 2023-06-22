import { snipes } from "../../lib/cache/snipe";
import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import type { Message } from "discord.js";

@ApplyOptions<Listener.Options>({})
export class UserEvent extends Listener<typeof Events.MessageDelete> {
	public override run(message: Message) {
		if (message.channel.isDMBased()) return;

		snipes.set(message.channelId, message);
	}
}
