import { fromTime, str } from "../utils/common";
import { UserError } from "@sapphire/framework";
import { Stopwatch } from "@sapphire/stopwatch";
import { isNullishOrEmpty } from "@sapphire/utilities";

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
	public async blur(url: string, sigma: string) {
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
	public async brighten(url: string, value: string) {
		return this.req(Endpoints.BRIGHTEN, url, {
			value
		});
	}

	/**
	 * Resizes an image
	 * @param url URL of the Image
	 * @param width New width
	 * @param height New height
	 * @returns ArrayBuffer
	 */
	public async resize(url: string, width: string, height: string) {
		return this.req(Endpoints.RESIZE, url, {
			width,
			height
		});
	}

	/**
	 * Grayscales an image
	 * @param url URL of the image
	 * @returns ArrayBuffer
	 */
	public async grayscale(url: string) {
		return this.req(Endpoints.GRAYSCALE, url);
	}

	/**
	 * "Pings" the API to get its status
	 * @returns string
	 */
	public async ping() {
		const timer = new Stopwatch();
		await fetch(`${this.baseURL}/health`);

		return timer.stop().toString();
	}

	private async req<T extends RequestPayload>(
		endpoint: Endpoints,
		url: string,
		payload?: T
	) {
		const response = await fetch(
			str(`${this.baseURL}${endpoint}?url={url}`, {
				url: encodeURIComponent(url),
				...payload
			})
		);

		const timeHeader = response.headers.get("X-Took");

		if (isNullishOrEmpty(timeHeader) || response.status !== 200)
			throw new UserError({
				identifier: "RequestFailed",
				message: await response.text()
			});

		const [buffer, time] = await Promise.all([
			response.arrayBuffer(),
			fromTime(response.headers.get("X-Took")!)
		]);

		return {
			buffer,
			time
		};
	}
}

export type RequestPayload = Record<string, unknown>;

export enum Endpoints {
	BLUR = "/blur/{sigma}",
	BRIGHTEN = "/brighten/{value}",
	CONVERT = "/convert/{format}",
	FLIP = "/flip/{orientation}",
	GRAYSCALE = "/grayscale",
	HUEROTATE = "/huerotate/{value}",
	RESIZE = "/resize/{width}/{height}"
}
