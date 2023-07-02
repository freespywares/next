import type { FormatArg } from "../types/common";
import type { AttachmentBuilder } from "discord.js";

export interface InvidiousVideo {
	type: string;
	title: string;
	videoId: string;
	author: string;
	authorId: string;
	authorUrl: string;
	authorVerified: boolean;
	videoThumbnails: InvidiousVideoThumbnail[];
	description: string;
	descriptionHtml: string;
	viewCount: number;
	viewCountText: string;
	published: number;
	publishedText: string;
	lengthSeconds: number;
	liveNow: boolean;
	premium: boolean;
	isUpcoming: boolean;
}

export interface InvidiousVideoThumbnail {
	quality: string;
	url: string;
	width: number;
	height: number;
}

export enum Endpoints {
	Blur = "/blur/{sigma}",
	Brighten = "/brighten/{value}",
	Convert = "/convert/{format}",
	Flip = "/flip/{orientation}",
	Grayscale = "/grayscale",
	Huerotate = "/huerotate/{value}",
	Resize = "/resize/{width}/{height}"
}

export type Payload = Record<string, FormatArg>;
export type Response = {
	time: string;
	buffer: ArrayBuffer;
	attachment: AttachmentBuilder;
};

export interface EndpointParameters {
	Blur: {
		sigma: number;
	};
	Brighten: {
		value: number;
	};
	Convert: {
		format: string;
	};
	Flip: {
		orientation: string;
	};
	Grayscale: {};
	Huerotate: {
		value: number;
	};
	Resize: {
		width: number;
		height: number;
	};
}
