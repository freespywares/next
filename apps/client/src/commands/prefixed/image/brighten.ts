import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { cast } from "@sapphire/utilities";
import { AttachmentBuilder, type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "Brightens an image",
	options: ["value"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const url = await args.pick("url");
		const value = cast<Int32Array>(args.getOption("value"));

		const output = await this.container.api.brighten(url.toString(), value);

		const file = new AttachmentBuilder(Buffer.from(output));

		return send(message, {
			files: [file]
		});
	}
}
