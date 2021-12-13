
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})



export class ChatComponent implements OnInit {
  message: string;
  messages = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendMessage(event? : Event){
    event.preventDefault();
    this.messages.push(this.message);
    this.message = '';
  }



}
