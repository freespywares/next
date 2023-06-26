import { ApplyOptions } from "@sapphire/decorators";
import { FetchResultTypes, fetch } from "@sapphire/fetch";
import { Command } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { codeBlock } from "@sapphire/utilities";
import type { Message } from "discord.js";
import type { DiscordStatus } from "../../../lib/types/discordstatus";

@ApplyOptions<Command.Options>({
	description: "check if discord is fucked up (again)",
	aliases: ["dstatus", "fuck"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const result = await fetch<DiscordStatus>(
			"https://discordstatus.com/api/v2/status.json",
			FetchResultTypes.JSON
		);

		return send(message, {
			content: codeBlock(
				`Status: ${result.status.description}\nActive incidents: ${
					result.incidents?.length ?? 0
				}\nAffected components: ${
					result.components?.filter(
						(component) => component.status !== "operational"
					)
						? result.components
								?.filter((component) => component.status !== "operational")
								.map((c) => c.name)
								.join(", ")
						: 0
				}`
			)
		});
	}
}
