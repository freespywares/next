import { hours } from "../lib/util/time";
import { ApplyOptions } from "@sapphire/decorators";
import { container } from "@sapphire/framework";
import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks";
import { Client as Dlist } from "@zeyrbot/dlist";

const prod = "1095425642159407165";

@ApplyOptions<ScheduledTask.Options>({
	interval: hours(2),
	enabled: container.client.user?.id === prod
})
export class StatsTask extends ScheduledTask {
	public async run() {
		await this.dlist
			.postGuildCount(this.container.client.guilds.cache.size)
			.then(() => this.container.logger.info("Posted stats to dlist.gg"));
	}

	public dlist = new Dlist({
		id: prod,
		token: process.env.DLIST_TOKEN
	});
}
