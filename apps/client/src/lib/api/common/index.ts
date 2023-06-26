export class APICommon {
	/**
	 * Base API url
	 */
	url: string;
	constructor(baseURL: string) {
		this.url = baseURL;
	}

	// public async ping() {}
	public async health() {
		return fetch(`${this.url}/health`).then((x) => x.text());
	}
}
