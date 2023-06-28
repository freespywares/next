import "./lib/setup";

import { Result } from "@sapphire/framework";

import { Zeyr } from "./lib/structures/zeyr";

const client = new Zeyr();

const main = async () => {
	const login = await Result.fromAsync(async () => await client.start());

	return login.unwrapOrElse((e) => client.panik(e));
};

main();
