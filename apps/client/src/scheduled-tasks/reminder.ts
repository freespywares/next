import { ApplyOptions } from "@sapphire/decorators";
import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks";
import type { Snowflake } from "discord.js";

type ReminderPayload = {
	userId: Snowflake;
	name: string;
};

@ApplyOptions<ScheduledTask.Options>({
	name: "reminder"
})
export class ReminderTask extends ScheduledTask {
	public async run(payload: ReminderPayload) {
		const user = await this.container.client.users.fetch(payload.userId);

		return user.send({
			content: "Your reminder `{name}` has ended".format({
				name: payload.name
			})
		});
	}
}
