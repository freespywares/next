import { attachments } from "../../../lib/cache";
import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, UserError } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { isNullOrUndefined } from "@sapphire/utilities";
import type { Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "brighten an image"
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const value = await args.pick("number");
		const url = await args
			.pick("string")
			.catch(() => attachments.get(message.channelId));

		const image = await this.container.api.image.brighten(url, { value });

		if (isNullOrUndefined(image))
			throw new UserError({
				identifier: "imageFail",
				message: "API returned invalid buffer"
			});

		return send(message, {
			content: image.time,
			files: [image.attachment]
		});
	}
}
