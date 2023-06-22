import { snipes } from "../../../lib/cache/snipe";
import { ApplyOptions } from "@sapphire/decorators";
import { Command, UserError } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { isNullOrUndefined } from "@sapphire/utilities";
import { EmbedBuilder, type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "get the last deleted message on the channel (if there is any)"
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const snipe = snipes.get(message.channelId);

		if (isNullOrUndefined(snipe))
			throw new UserError({
				identifier: "NoSnipes",
				message: "No snipes on this channel"
			});

		const embed = new EmbedBuilder().setAuthor({
			name: snipe.author.username,
			iconURL: snipe.author.displayAvatarURL() ?? snipe.author.defaultAvatarURL
		});

		if (snipe.content) {
			embed.setDescription(snipe.content);
		}

		if (snipe.attachments.first()) {
			embed.setImage(snipe.attachments.first()?.proxyURL!);
		}

		return send(message, {
			embeds: [embed]
		});
	}
}
