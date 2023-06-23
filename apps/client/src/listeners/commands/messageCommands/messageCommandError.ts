import { str } from "../../../lib/utils/common";
import type { Events, MessageCommandErrorPayload } from "@sapphire/framework";
import { Identifiers, Listener, type UserError } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { cast } from "@sapphire/utilities";

export class UserEvent extends Listener<typeof Events.MessageCommandError> {
	public async run(
		{ context, message: content, identifier }: UserError,
		{ message, command }: MessageCommandErrorPayload
	) {
		let error: string;

		if (Reflect.get(Object(context), "silent")) return;

		switch (identifier) {
			case Identifiers.ArgsMissing:
				error = str("Insufficient arguments provided, options: `{arguments}`", {
					arguments: cast<string[]>(command.options.options).join(", ")
				});
				break;

			default:
				error = content;
				break;
		}

		return reply(message, {
			content: error,
			allowedMentions: { users: [message.author.id], roles: [] }
		});
	}
}
