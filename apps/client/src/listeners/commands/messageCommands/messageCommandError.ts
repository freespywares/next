import type { Events, MessageCommandErrorPayload } from "@sapphire/framework";
import { Identifiers, Listener, type UserError } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";

export class UserEvent extends Listener<typeof Events.MessageCommandError> {
	public async run(
		{ context, message, identifier }: UserError,
		{ message: msg }: MessageCommandErrorPayload
	) {
		let error: string;

		if (Reflect.get(Object(context), "silent")) return;

		switch (identifier) {
			case Identifiers.ArgsMissing:
				error = "Insufficient arguments provided";
				break;

			default:
				error = message;
				break;
		}

		return reply(msg, {
			content: error,
			allowedMentions: { users: [msg.author.id], roles: [] }
		});
	}
}
