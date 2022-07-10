# EMS Web Application Components: Growl & Snackbar Messages

The Messages Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

Find the [web application template source code on GitHub](https://github.com/spencech/ems-web-app-template) to review implementation in context.

Find a [working example of this component here](https://ems-web-app.educationalmediasolutions.com).

This package includes a component and service that can be used to render "Growl" or "Snackbar" style in-app messages.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.


## Usage: Module Import

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { AppComponent } from './app.component';
	import { MessagesModule, MessagesService } from "ems-web-app-messages";

	@NgModule({
	  declarations: [
	    AppComponent 
	  ],
	  imports: [
	    BrowserModule,
	    MessagesModule 
	  ],
	  providers: [ MessagesService ],
	  bootstrap: [ AppComponent ]
	})
	export class AppModule { }


## Usage: Template Implementation
	
	<messages background="rgba(0,0,255, 0.8)" color="white" [transition-speed]="1"></messages>

You can configure background color, text color and transition speed for the incoming/outgoing animations. You can also write whatever styles you deem necessary to override default appearance.

Messages can be "stacked" and will render in the order that they were added to the queue. Only one message renders at a time.

## Usage: Component Implementation with Basic Message

	import { Component, OnInit } from '@angular/core';
	import { MessagesService, MessageType, MessagePosition } from "ems-web-app-messages";

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent implements OnInit  {
	  constructor(private messageService: MessagesService) { }
	  
	  ngOnInit() {
	  	this.messageService.setCurrentMessage({
	      type: MessageType.Growl,
	      position: MessagePosition.TopRight,
	      message: "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor.",
	      duration: 4 //seconds that message will appear before exiting
	    })
	  }
	}


## Usage: Component Implementation with Custom Template

	import { Component, OnInit } from '@angular/core';
	import { MessagesService, MessageType, MessagePosition } from "ems-web-app-messages";

	@Component({
	  selector: 'app-root',
	  template: `<ng-template #customTemplate>
	  				<img src="some/graphic.gif"/>
					<p>Custom Template</p>
				</ng-template>`,
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent implements OnInit  {

	  @ViewChild("customTemplate") customTemplate!: TemplateRef<any>

	  constructor(private messageService: MessagesService) { }
	  
	  ngOnInit() {
	  	this.messageService.setCurrentMessage({
	      type: MessageType.Snackbar,
	      position: MessagePosition.TopCenter,
	      template: customTemplate,
	      duration: 4
	    })
	  }
	}


**Note:** Growl messages can only be positioned at MessagePosition.TopLeft, MessagePosition.TopRight, MessagePosition.BottomLeft and MessagePosition.BottomRight. Snackbar messages can only be positioned at MessagePosition.TopCenter and MessagePosition.BottomCenter.

## Enums

	export enum MessageType {
		Growl = "growl",
		Snackbar = "snackbar"
	}

	export enum MessagePosition {
		TopLeft = "top left",
		TopCenter = "top center",
		TopRight = "top right",
		BottomLeft = "bottom left",
		BottomCenter = "bottom center",
		BottomRight = "bottom right"
	}



This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Code scaffolding

Run `ng generate component component-name --project messages` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project messages`.
> Note: Don't forget to add `--project messages` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build messages` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build messages`, go to the dist folder `cd dist/messages` and run `npm publish`.

## Running unit tests

Run `ng test messages` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
