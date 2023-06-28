import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { roundNumber } from "@sapphire/utilities";
import type { Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "ping pong"
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const msg = await send(message, "Ping?");

		const content = "WebSocket: {ws}ms\nAPI: {api}ms".format({
			ws: roundNumber(this.container.client.ws.ping),
			api:
				(msg.editedTimestamp || msg.createdTimestamp) -
				(message.editedTimestamp || message.createdTimestamp)
		});

		return send(message, content);
	}
}
