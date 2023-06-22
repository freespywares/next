import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { AttachmentBuilder, type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "Blurs an image",
	options: ["sigma"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const url = await args.pick("url");
		const sigma = args.getOptionResult("sigma");

		const { buffer, time } = await this.container.api.blur(
			url.toString(),
			sigma.unwrap()
		);

		const file = new AttachmentBuilder(Buffer.from(buffer));

		return send(message, {
			content: time,
			files: [file]
		});
	}
}
