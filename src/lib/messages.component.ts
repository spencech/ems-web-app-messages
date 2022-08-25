import { Component, OnInit, Input, HostListener, HostBinding } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageType, MessagePosition } from "./messages.enums";
import { IMessage } from "./messages.interfaces";
import { MessagesService } from "./messages.service";

@Component({
  selector: 'messages',
  template: `
    <ng-container *ngTemplateOutlet="currentMessage?.template ?? null"></ng-container>
    <div *ngIf="!currentMessage?.template" class="message-text">{{sanitizer.bypassSecurityTrustHtml(currentMessage?.message || '')}}</div>
    <div class="style-container" [innerHtml]="styles"></div>
  `,
  styleUrls: [ './messages.component.less' ]
})
export class MessagesComponent implements OnInit  {

  @HostBinding('class.render') render: boolean = false;
  @HostBinding('class') classes: string = "";
  @Input("background") background: string = "rgba(0,0,0,0.75)";
  @Input("color") color: string = "#fff";
  @Input("z-index") zIndex: number = 1000;
  @Input("transition-speed") speed: number = 0.5;


  public styles!: SafeHtml;
  public currentMessage?: IMessage;
  public queue: IMessage[] = [];

  private timeout: number = 0;

  constructor(private service: MessagesService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.service.currentMessage.subscribe(message => {
      if(!message && !this.currentMessage) return;
      if(!message) this.processMessageQueue(true);
      if(!this.validateMessage(message!)) return;
      this.queue.push(message!);
      this.processMessageQueue();
    });
  }

  @HostListener('click', ['$event.target'])
  onContainerClick = (element: HTMLElement) => {
    this.processMessageQueue(true);
  }

  private initializeStyles() {
    if(!this.currentMessage) return;
    const duration = this.currentMessage.duration ?? 1;
    const output = `messages { 
      background: ${this.background}; 
      color: ${this.color}; 
      transition-duration: ${this.speed}s; 
      z-index: ${this.zIndex};
    } 
    messages.render {
      transition-duration: ${this.speed}s;
    }`;
    this.styles = this.sanitizer.bypassSecurityTrustHtml(`<style>${output}</style>`);
  }

  private async processMessageQueue(force: boolean = false) {
    if(this.currentMessage && !force) return;
    await this.removeCurrentMessage();
    this.currentMessage = this.queue.shift();
    this.classes = `${this.currentMessage?.position} ${this.currentMessage?.type} ${this.currentMessage?.classes ?? ''}`;
    await this.tick();
    this.initializeStyles();
    this.showNextMessage();
  }

  private removeCurrentMessage() {
    clearTimeout(this.timeout);

    return new Promise((resolve: (message?: IMessage) => void) => {
      if(!this.currentMessage) {
        setTimeout(() => resolve());
      } else {
        this.render = false;
        setTimeout(() => resolve(), this.speed * 1000);
      }
    });
  }

  private tick() {
    return new Promise((resolve: (message?: IMessage) => void) => {
        setTimeout(() => resolve(), this.speed * 1000);
    });
  }

  private showNextMessage() {
    if(!this.currentMessage) return;
    setTimeout(() => this.render = true);
    this.timeout = window.setTimeout(() => this.processMessageQueue(true), this.currentMessage.duration * 1000);
  }

  private validateMessage(message: IMessage): boolean {
    const growlPositions = [MessagePosition.BottomLeft, MessagePosition.BottomRight, MessagePosition.TopLeft, MessagePosition.TopRight];
    const snackbarPositions = [MessagePosition.TopCenter, MessagePosition.BottomCenter];
    if(!message) return false;
    
    if(message.type === MessageType.Growl && growlPositions.indexOf(message.position) === -1) {
      throw new Error("Growl messages must use one of the following positions: MessagePosition.BottomLeft, MessagePosition.BottomRight, MessagePosition.TopLeft, MessagePosition.TopRight")
      return false;
    }

    if(message.type === MessageType.Snackbar && snackbarPositions.indexOf(message.position) === -1) {
      throw new Error("Snackbar messages must use one of the following positions: MessagePosition.TopCenter, MessagePosition.BottomCenter")
      return false;
    }

    return true;
  }
}
