import { Result } from "@sapphire/framework";
import "./lib/setup";

import { Zeyr } from "./lib/structures/zeyr";

const client = new Zeyr();

const main = async () => {
	const login = await Result.fromAsync(async () => await client.start());

	return login.unwrapOrElse((e) => client.panik(e));
};

main();
