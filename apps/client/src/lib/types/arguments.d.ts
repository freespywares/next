import type { API } from "../api";
import type { FormatArg } from "./common";
import type { ArrayString } from "@skyra/env-utilities";

declare module "@sapphire/pieces" {
	interface Container {
		api: API;
	}
}

declare module "@skyra/env-utilities" {
	interface Env {
		OWNERS: ArrayString;
		REDIS_PORT: number;
		REDIS_USERNAME: string;
		REDIS_HOST: string;
		REDIS_PASSWORD: string;
		DLIST_TOKEN: string;
		INVIDIOUS_BASE_URL: string;
	}
}

declare global {
	interface String {
		format(args: Record<string, FormatArg>): string;
	}
}

declare module "@sapphire/plugin-scheduled-tasks" {
	interface ScheduledTasks {
		reminder: never;
	}
}

export default undefined;
