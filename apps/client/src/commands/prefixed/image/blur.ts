import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { cast } from "@sapphire/utilities";
import { AttachmentBuilder, type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "Blurs an image",
	options: ["sigma"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const url = await args.pick("url");
		const sigma = cast<Uint32Array>(args.getOption("sigma"));

		const { buffer, time } = await this.container.api.blur(
			url.toString(),
			sigma
		);

		const file = new AttachmentBuilder(Buffer.from(buffer));

		return send(message, {
			content: time,
			files: [file]
		});
	}
}
