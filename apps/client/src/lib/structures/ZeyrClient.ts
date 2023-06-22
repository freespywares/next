import { SapphireClient, container } from "@sapphire/framework";
import { greenBright } from "colorette";
import { clientOptions } from "../constants";
import { ImageAPI } from "../image/client";

export class ZeyrClient extends SapphireClient {
	constructor() {
		super(clientOptions);

		container.api = new ImageAPI(process.env.IMAGE_API_URL!);
	}

	public async start() {
		await super.login(process.env.DISCORD_TOKEN);
		container.logger.info(`${greenBright("󱘖")} Connected`);
	}

	public panic(error: unknown) {
		container.logger.fatal(error);
		super.destroy();
		process.exit(1);
	}
}
