import { TemplateRef } from '@angular/core';
import { MessageType, MessagePosition } from "./messages.enums";

export interface IMessage {
	type: MessageType,
	message?: string,
	template?: TemplateRef<any>,
	duration: number,
	classes?: string,
	position: MessagePosition
}