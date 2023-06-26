import "@sapphire/plugin-editable-commands/register";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-subcommands/register";
import "@sapphire/plugin-scheduled-tasks/register";

import {
	ApplicationCommandRegistries,
	RegisterBehavior
} from "@sapphire/framework";
import { setup } from "@skyra/env-utilities";
import * as colorette from "colorette";
import { inspect } from "util";
import type { FormatArg } from "./types/common";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
	RegisterBehavior.BulkOverwrite
);

// Initialize configurations
setup();

inspect.defaultOptions.depth = 1;

colorette.createColors({ useColor: true });

String.prototype.format = function (args: Record<string, FormatArg>): string {
	return this.replace(/{([^{}]*)}/g, (_, placeholder) => {
		const value = args[placeholder.trim()];
		if (value === undefined) {
			throw new Error(`Missing value for placeholder '${placeholder}'`);
		}
		return String(value);
	});
};
