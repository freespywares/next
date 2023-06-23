import type { Attachment, EmbedAssetData, Snowflake } from "discord.js";

export const attachments = new Map<Snowflake, Attachment | EmbedAssetData>();
