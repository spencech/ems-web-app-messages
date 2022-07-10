import { TemplateRef } from '@angular/core';
import { MessageType, MessagePosition } from "./messages.enums";

export interface IMessage {
	id: string,
	type: MessageType,
	message?: string,
	template?: TemplateRef<any>,
	duration: number,
	position: MessagePosition
}