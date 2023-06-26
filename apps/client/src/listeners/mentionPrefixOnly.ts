import type { Events } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { inlineCodeBlock } from "@sapphire/utilities";
import type { Message } from "discord.js";

export class UserEvent extends Listener<typeof Events.MentionPrefixOnly> {
	public async run(message: Message) {
		const prefies = this.container.client.options.defaultPrefix as string[];

		return send(
			message,
			`hey, you can execute commands with the following prefixes: ${inlineCodeBlock(
				prefies.join(", ")
			)}`
		);
	}
}
