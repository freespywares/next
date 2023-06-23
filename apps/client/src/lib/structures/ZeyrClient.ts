import { clientOptions } from "../constants";
import { ImageAPI } from "../image/client";
import { SapphireClient, container } from "@sapphire/framework";
import { greenBright } from "colorette";

export class ZeyrClient extends SapphireClient {
	constructor() {
		super(clientOptions);

		container.api = new ImageAPI(process.env.API_URL!);
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
