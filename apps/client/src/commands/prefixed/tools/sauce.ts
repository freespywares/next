import { attachments } from "../../../lib/cache";
import { ApplyOptions } from "@sapphire/decorators";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Args, Command, UserError } from "@sapphire/framework";
import { type Message } from "discord.js";

@ApplyOptions<Command.Options>({
	description: "search for similar images",
	aliases: ["similar", "sa"],
	nsfw: true
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const url = await args
			.pick("string")
			.catch(() => attachments.get(message.channelId));

		const display = new PaginatedMessage();

		const images = await this.container.api.tools.sauce(url!);

		if (images.message)
			throw new UserError({
				identifier: "sauceFail",
				message: images.message
			});

		for (const image of images.items)
			display.addPageBuilder((page) => page.setContent(image.link));

		return await display.run(message, message.author);
	}
}
