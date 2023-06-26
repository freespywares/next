import { Identifiers, Listener, type UserError } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type {
	MessageSubcommandErrorPayload,
	SubcommandPluginEvents
} from "@sapphire/plugin-subcommands";

export class UserEvent extends Listener<
	typeof SubcommandPluginEvents.MessageSubcommandError
> {
	public async run(
		{ context, message, identifier }: UserError,
		{ message: msg }: MessageSubcommandErrorPayload
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
