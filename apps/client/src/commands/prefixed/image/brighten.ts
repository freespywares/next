import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { AttachmentBuilder, type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "Brightens an image",
	options: ["value"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const url = await args.pick("url");
		const value = args.getOptionResult("value");

		const { buffer, time } = await this.container.api.brighten(
			url.toString(),
			value.unwrap()
		);

		const file = new AttachmentBuilder(Buffer.from(buffer));

		return send(message, {
			content: time,
			files: [file]
		});
	}
}
