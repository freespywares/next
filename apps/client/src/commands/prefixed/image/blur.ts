import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { AttachmentBuilder, type Message } from "discord.js";
import { getDiscordMedia } from "../../../lib/utils/common";

@ApplyOptions<Command.Options>({
	description: "Blurs an image",
	options: ["sigma"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const media = await getDiscordMedia(message, args);
		const sigma = args.getOption("sigma") ?? "5";

		const { buffer, time } = await this.container.api.blur(
			media as string,
			sigma
		);

		return send(message, {
			content: time,
			files: [new AttachmentBuilder(Buffer.from(buffer))]
		});
	}
}
