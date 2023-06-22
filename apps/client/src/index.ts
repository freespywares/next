import "./lib/setup";

import { ZeyrClient } from "./lib/structures/ZeyrClient";
import { Result } from "@sapphire/framework";

const client = new ZeyrClient();

async function init() {
	const resultClient = await Result.fromAsync(async () => await client.start());

	return resultClient.unwrapOrElse((error) => {
		return client.panic(error);
	});
}

init();
