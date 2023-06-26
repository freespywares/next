import { ApplyOptions } from "@sapphire/decorators";
import { FetchResultTypes, fetch } from "@sapphire/fetch";
import { Args, Command } from "@sapphire/framework";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Colors, EmbedBuilder, type Message } from "discord.js";
import type { InvidiousVideo } from "../../../lib/api/types";

@ApplyOptions<Command.Options>({
	description: "search youtube videos (uses invidious api)",
	aliases: ["iv", "yt", "youtube"],
	options: ["hl"]
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const query = await args.rest("string");
		const hl = args.getOption("hl") ?? "en";

		const display = new PaginatedMessage({
			template: new EmbedBuilder().setColor(Colors.Red)
		});

		const url = `${
			process.env.INVIDIOUS_BASE_URL
		}/search?q=${encodeURIComponent(query)}&hl=>${hl}`;

		const results = await fetch<InvidiousVideo[]>(url, FetchResultTypes.JSON);
		const videos = results.slice(0, 25).filter((v) => v.type === "video");

		for (const video of videos)
			display.addPageEmbed((embed) =>
				embed
					.setAuthor({
						name: video.author
					})
					.setTitle(video.title)
					.setURL(`https://www.youtube.com/watch?v=${video.videoId}`)
					.setImage(this.youtubeThumb(video.videoId))
					.setFooter({
						text: ` ${video.publishedText}`
					})
			);

		return await display.run(message, message.author);
	}

	public youtubeThumb(videoId: string) {
		return `https://i.ytimg.com/vi/${videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAwQtNN8WQdPgf83eOv-xxCrdbRBg`;
	}
}
