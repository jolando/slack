
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})



export class ChatComponent implements OnInit {
  message: string;
  messages = [];
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.messages.push(this.message);
    this.message = '';
  }

  breakLine(){
    console.log('breakeLine');
   this.message = this.message + `<br>`;
    
  }

}
