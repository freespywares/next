import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { str } from "../../../lib/utils/common";
import { roundNumber } from "@sapphire/utilities";

@ApplyOptions<Command.Options>({
	description: "check zeyr's latency"
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const msg = await send(message, "wait..");

		const ping = {
			ws: roundNumber(this.container.client.ws.ping),
			discord:
				(msg.editedTimestamp || msg.createdTimestamp) -
				(message.editedTimestamp || message.createdTimestamp),
			api: await this.container.api.ping().catch(() => "api down")
		};

		const content = str("ws: {ws}ms\ndiscord: {discord}ms\napi: {api}", {
			ws: ping.ws,
			discord: ping.discord,
			api: ping.api
		});

		return send(message, content);
	}
}
