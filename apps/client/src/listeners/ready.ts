import { ApplyOptions } from "@sapphire/decorators";
import { Listener, type Piece, type Store } from "@sapphire/framework";
import { blue, gray, yellow } from "colorette";

const dev = process.env.NODE_ENV !== "production";

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public async run() {
		const apiOnline = await this.checkAPIStatus();

		this.printStoreDebugInformation();

		if (apiOnline) this.container.logger.info("API online");
		else this.container.logger.error("API offline, please turn it ON");
	}

	private async checkAPIStatus() {
		return this.container.api.common
			.health()
			.then(() => true)
			.catch(() => false);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<Piece>, last: boolean) {
		return gray(
			`${last ? "└─" : "├─"} Loaded ${this.style(
				store.size.toString().padEnd(3, " ")
			)} ${store.name}.`
		);
	}
}
