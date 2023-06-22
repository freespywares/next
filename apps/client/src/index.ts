import "./lib/setup";

import { Result } from "@sapphire/framework";
import { ZeyrClient } from "./lib/structures/ZeyrClient";

const client = new ZeyrClient();

async function init() {
	const resultClient = await Result.fromAsync(async () => await client.start());

	return resultClient.unwrapOrElse((error) => {
		return client.panic(error);
	});
}

init();
