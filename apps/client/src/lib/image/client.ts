import { str } from "../utils/common";
import { UserError } from "@sapphire/framework";
import { Stopwatch } from "@sapphire/stopwatch";

export class ImageAPI {
	baseURL: string;
	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	/**
	 * Blurs an image
	 * @param url URL of the Image
	 * @param sigma Measure of how much to blur by
	 * @returns ArrayBuffer
	 */
	public async blur(url: string, sigma: Uint32Array) {
		return this.req(Endpoints.BLUR, url, {
			sigma
		});
	}

	/**
	 * Brightens an image
	 * @param url URL of the Image
	 * @param value Brighten level
	 * @returns ArrayBuffer
	 */
	public async brighten(url: string, value: Int32Array) {
		return this.req(Endpoints.BRIGHTEN, url, {
			value
		});
	}

	public async ping() {
		const timer = new Stopwatch();
		const result = await (await fetch(`${this.baseURL}/health`)).text();

		if (result === "success") {
			return timer.stop().toString();
		} else {
			timer.stop();
			return "api down";
		}
	}

	private async req<T extends RequestPayload>(
		endpoint: Endpoints,
		url: string,
		payload?: T
	) {
		return fetch(
			str(`${this.baseURL}${endpoint}?url=${encodeURIComponent(url)}`, {
				...payload
			})
		)
			.then((i) => i.arrayBuffer())
			.catch(() => {
				throw new UserError({
					message: "The API is down right now",
					identifier: "RequestImageFailed"
				});
			});
	}
}

type RequestPayload = Record<string, unknown>;

export enum Endpoints {
	BLUR = "/blur/{sigma}",
	BRIGHTEN = "/brighten/{value}",
	CONVERT = "/convert/{format}",
	FLIP = "/flip/{orientation}",
	GRAYSCALE = "/grayscale",
	HUEROTATE = "/huerotate/{value}"
}
