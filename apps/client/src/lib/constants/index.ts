import { LogLevel } from "@sapphire/framework";
import { type ClientOptions, GatewayIntentBits, Partials } from "discord.js";

export const clientOptions: ClientOptions = {
	defaultPrefix: "-",
	regexPrefix: /^(hey +)?zeyr[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level:
			process.env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info
	},
	shards: "auto",
	intents: [
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel],
	loadMessageCommandListeners: true
};
