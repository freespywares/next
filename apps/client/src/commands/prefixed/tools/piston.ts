import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { codeBlock } from "@sapphire/utilities";
import type { Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "execute code",
	aliases: ["run", "code"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const language = await args.pick("string");
		const code = await args.rest("string");

		const result = await this.container.api.tools.piston(
			language,
			this.cleanCodeBlock(code)
		);

		return send(message, {
			content: codeBlock(result)
		});
	}

	public cleanCodeBlock(text: string) {
		return text.replace(/```.*\n([\s\S]*)\n?```/g, "$1");
	}
}
