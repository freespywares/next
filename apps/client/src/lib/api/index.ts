import { APICommon } from "./common";
import { APIImage } from "./image";
import { APITools } from "./tools";

export class API {
	/**
	 * Base API url
	 */
	url: string;
	constructor(baseURL: string) {
		this.url = baseURL;
	}

	get image() {
		return new APIImage(`${this.url}/v1/image`);
	}

	get common() {
		return new APICommon(`${this.url}/v1`);
	}

	get tools() {
		return new APITools(`${this.url}/v1/tools`);
	}
}
