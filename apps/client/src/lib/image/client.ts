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
	 * Changes an image format
	 * @param url URL of the image
	 * @param format New format
	 * @returns ArrayBuffer
	 */
	public async convert(url: string, format: ConvertFormats) {
		return this.req(Endpoints.CONVERT, url, { format });
	}

	/**
	 * Flips the image
	 * @param url URL of the image
	 * @param orientation Orientation
	 * @returns ArrayBuffer
	 */
	public async flip(url: string, orientation: FlipOrientations) {
		return this.req(Endpoints.FLIP, url, { orientation });
	}

	/**
	 * Rotates the image hue color
	 * @param url URL of the image
	 * @param value Number in degs
	 * @returns ArrayBuffer
	 */
	public async huerotate(url: string, value: string) {
		return this.req(Endpoints.HUEROTATE, url, { value });
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
			str(`${this.baseURL}/image${endpoint}?url={url}`, {
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
export type FlipOrientations = "vertical" | "horizontal";
export type ConvertFormats = "png" | "webp" | "jpeg";

export enum Endpoints {
	BLUR = "/blur/{sigma}",
	BRIGHTEN = "/brighten/{value}",
	CONVERT = "/convert/{format}",
	FLIP = "/flip/{orientation}",
	GRAYSCALE = "/grayscale",
	HUEROTATE = "/huerotate/{value}",
	RESIZE = "/resize/{width}/{height}"
}
