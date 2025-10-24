import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-button',
  templateUrl: './hello-button.component.html',
  styleUrls: ['./hello-button.component.css']
})
export class HelloButtonComponent implements OnInit {

  clickCounter = 0;
  greetingMessage = '';

  constructor() { }

  ngOnInit(): void { }

  onHelloClick(): void {
    this.clickCounter++;
    this.greetingMessage = `Hello! You clicked ${this.clickCounter} time(s)!`;
  }
}
