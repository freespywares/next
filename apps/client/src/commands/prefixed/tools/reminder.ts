import { ApplyOptions } from "@sapphire/decorators";
import { Args, UserError } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { isNullish } from "@sapphire/utilities";
import type { Message } from "discord.js";
import ms, { type StringValue } from "ms";

@ApplyOptions<Subcommand.Options>({
	description: "manage reminders",
	options: ["time"],
	typing: false,
	subcommands: [
		{
			name: "create",
			messageRun: "reminderCreate"
		}
	]
})
export class UserCommand extends Subcommand {
	public async reminderCreate(message: Message, args: Args) {
		const name = await args.rest("string");
		const time = args.getOption("time");

		if (isNullish(time))
			throw new UserError({
				identifier: "invalidTime",
				message:
					"please input a valid time. e.g: `-reminder create vote zeyr --time=1d`"
			});

		const formattedTime = ms(time as StringValue);

		await this.container.tasks.create(
			"reminder",
			{
				userId: message.author.id,
				name
			},
			formattedTime
		);

		return send(message, "reminder created, cya");
	}
}
