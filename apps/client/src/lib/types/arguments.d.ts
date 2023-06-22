import type { ArrayString } from "@skyra/env-utilities";
import type { ImageAPI } from "../image/client";

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
