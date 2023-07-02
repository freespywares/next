import {
	type EndpointParameters,
	Endpoints,
	type Payload,
	type Response
} from "../types";
import { FetchResultTypes, fetch } from "@sapphire/fetch";
import { Result } from "@sapphire/framework";
import { AttachmentBuilder } from "discord.js";

export class APIImage {
	/**
	 * Base API url
	 */
	url: string;
	constructor(baseURL: string) {
		this.url = baseURL;
	}

	public async blur(url?: string, params?: EndpointParameters["Blur"]) {
		return this.get(Endpoints.Blur, url, params);
	}

	public async brighten(url?: string, params?: EndpointParameters["Brighten"]) {
		return this.get(Endpoints.Brighten, url, params);
	}

	public async convert(url?: string, params?: EndpointParameters["Convert"]) {
		return this.get(Endpoints.Convert, url, params);
	}

	public async flip(url?: string, params?: EndpointParameters["Flip"]) {
		return this.get(Endpoints.Flip, url, params);
	}

	public async grayscale(url?: string) {
		return this.get(Endpoints.Grayscale, url);
	}

	public async huerotate(
		url?: string,
		params?: EndpointParameters["Huerotate"]
	) {
		return this.get(Endpoints.Huerotate, url, params);
	}

	public async resize(url?: string, params?: EndpointParameters["Resize"]) {
		return this.get(Endpoints.Resize, url, params);
	}

	private async get<T extends Payload>(
		endpoint: Endpoints,
		url?: string,
		payload?: T
	): Promise<Response | undefined> {
		const request = `${this.url}${endpoint}${
			url ? `?url=${encodeURIComponent(url)}` : ""
		}`.format(payload ?? {});
		console.log(request);
		const result = await Result.fromAsync(
			async () => await fetch(request, FetchResultTypes.Result)
		);

		return result.match({
			ok: async (r) => {
				const buffer = await r.arrayBuffer();
				const time = "took {time}ms".format({
					time: r.headers.get("X-Took")!
				});

				return {
					time,
					buffer,
					attachment: new AttachmentBuilder(Buffer.from(buffer))
				};
			},
			err: () => undefined
		});
	}
}
