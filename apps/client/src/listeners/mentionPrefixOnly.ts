import type { Events } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { str } from "../lib/utils/common";

export class UserEvent extends Listener<typeof Events.MentionPrefixOnly> {
	public async run(message: Message) {
		const prefix = this.container.client.options.defaultPrefix;

		return send(
			message,
			str("My prefix here is {prefix}, but you always can use slash commands", {
				prefix
			})
		);
	}
}
