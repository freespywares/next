import { LogLevel } from "@sapphire/framework";
import { GatewayIntentBits, Partials, type ClientOptions } from "discord.js";

export const clientConfig: ClientOptions = {
	defaultPrefix: ["->", "~>", "-"],
	regexPrefix: /^(hey|yo +)?zeyr[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: "auto",
	intents: [
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel],
	loadMessageCommandListeners: true,
	typing: true,
	tasks: {
		bull: {
			connection: {
				host: process.env.REDIS_HOST,
				port: process.env.REDIS_PORT,
				username: process.env.REDIS_USERNAME,
				password: process.env.REDIS_PASSWORD
			}
		}
	}
};
