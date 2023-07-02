import { minutes } from "../lib/util/time";
import { ApplyOptions } from "@sapphire/decorators";
import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks";
import { isNullOrUndefined } from "@sapphire/utilities";
import { ActivityType } from "discord.js";

@ApplyOptions<ScheduledTask.Options>({
	interval: minutes(5)
})
export class PresenceTask extends ScheduledTask {
	public async run() {
		// Get a quote from Kanye :P
		const { quote } = (await (
			await fetch("https://api.kanye.rest/")
		).json()) as { quote: string };

		if (isNullOrUndefined(quote))
			return this.container.client.user?.setActivity({
				name: "you",
				type: ActivityType.Watching
			});

		return this.container.client.user?.setActivity({
			name: quote.toLowerCase(),
			type: ActivityType.Watching
		});
	}
}
