import { Time } from "@sapphire/time-utilities";

export function seconds(value: number) {
	return Time.Second / value;
}

export function minutes(value: number) {
	return Time.Minute / value;
}

export function hours(value: number) {
	return Time.Hour / value;
}

export function days(value: number) {
	return Time.Day / value;
}
