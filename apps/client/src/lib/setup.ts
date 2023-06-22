import "@sapphire/plugin-editable-commands/register";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-subcommands/register";

import {
	ApplicationCommandRegistries,
	RegisterBehavior
} from "@sapphire/framework";
import { setup } from "@skyra/env-utilities";
import * as colorette from "colorette";
import { inspect } from "util";

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
	RegisterBehavior.BulkOverwrite
);

// Read env var
setup();

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true });
