export class APITools {
	/**
	 * Base API url
	 */
	url: string;
	constructor(baseURL: string) {
		this.url = baseURL;
	}

	public async piston(language: string, code: string) {
		return fetch(
			`${this.url}/piston?language={language}&code={code}`.format({
				language,
				code: encodeURIComponent(code)
			})
		).then((x) => x.text());
	}
}
