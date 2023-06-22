import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, UserError } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { cast, isNullishOrEmpty } from "@sapphire/utilities";
import { AttachmentBuilder, type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "Blurs an image",
	options: ["sigma"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const url = await args.pick("url");
		const sigma = cast<Uint32Array | null>(args.getOption("sigma"));

		if (isNullishOrEmpty(sigma))
			throw new UserError({
				identifier: "BlurNoSigma",
				message: "You must provide a sigma value (`--sigma=<n>`)"
			});

		const output = await this.container.api.blur(url.toString(), sigma);

		const file = new AttachmentBuilder(Buffer.from(output));

		return send(message, {
			files: [file]
		});
	}
}
