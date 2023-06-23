import type { ImageAPI } from "../image/client";
import type { ArrayString } from "@skyra/env-utilities";

declare module "@skyra/env-utilities" {
	interface Env {
		OWNERS: ArrayString;
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		OwnerOnly: never;
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		api: ImageAPI;
	}
}

declare module "@sapphire/framework" {
	interface ArgType {
		media: string;
	}
}
