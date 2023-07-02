import { createTable } from "../../../lib/util/discord";
import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, UserError } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import {
	codeBlock,
	isNullOrUndefined,
	isNullish,
	isNullishOrEmpty
} from "@sapphire/utilities";
import type { Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "help."
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const command = await args.pick("string").catch(() => null);
		const commands = this.container.stores
			.get("commands")
			.filter((c) => c.name !== "eval");

		if (command) {
			const cmd = commands.get(command);

			if (isNullOrUndefined(cmd))
				throw new UserError({
					identifier: "invalidCommand",
					message: "command not found"
				});

			return send(
				message,
				createTable(
					["name", cmd.name],
					[
						"aliases",
						isNullishOrEmpty(cmd.aliases) ? "none" : cmd.aliases.join(", ")
					],
					["description", cmd.description ?? "none"]
				)
			);
		}

		return send(
			message,
			codeBlock(commands.map((c) => `${c.name} -> ${c.description}`).join("\n"))
		);
	}
}
