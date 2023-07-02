import { API } from "../api";
import { clientConfig } from "../config/client";
import { SapphireClient, container } from "@sapphire/framework";

export class Zeyr extends SapphireClient {
	constructor() {
		super(clientConfig);

		container.api = new API(process.env.API_BASE_URL!);
	}

	public async start() {
		container.logger.info("Attempting to login on Discord...");
		await super.login();
		container.logger.info("Logged in");
	}

	public panik(e: Error) {
		container.logger.fatal(e);
		super.destroy();
		container.logger.fatal("Destroyed client");
		container.logger.fatal("Exited process");
		process.exit(1);
	}
}
