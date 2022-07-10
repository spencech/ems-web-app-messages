import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { IMessage } from "./messages.interfaces";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private currentMessageSource:BehaviorSubject<IMessage | undefined> = new BehaviorSubject< IMessage | undefined>(undefined);
  public currentMessage = this.currentMessageSource.asObservable();

  constructor() { }

  public setCurrentMessage(message: IMessage | undefined) {
    this.currentMessageSource.next(message);
  }
}
