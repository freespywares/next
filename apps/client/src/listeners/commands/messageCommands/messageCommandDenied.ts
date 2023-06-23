import type { Events, MessageCommandDeniedPayload } from "@sapphire/framework";
import { Identifiers, Listener, type UserError } from "@sapphire/framework";
import { str } from "../../../lib/utils/common";
import { cast } from "@sapphire/utilities";
import { reply } from "@sapphire/plugin-editable-commands";

export class UserEvent extends Listener<typeof Events.MessageCommandDenied> {
	public async run(
		{ context, message: content, identifier }: UserError,
		{ message, command }: MessageCommandDeniedPayload
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
