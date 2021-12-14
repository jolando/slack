
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})



export class ChatComponent implements OnInit {
  messageText: string = '';
  message = {};
  messages = [];



  constructor(private router: Router, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    
    this.firestore
    .collection('channels')
    .doc('tHvLHahPsEcAJ7qHsHmy')
    .valueChanges()
    .subscribe((changes: any) =>{
      
      this.messages = changes.messages;
    });
    
  }

  sendMessage(event?){
    
    if(event){
      event.preventDefault();
    }
    
    if(this.messageText.replace(/\s/g, '').length){
      this.message['messageText'] = this.messageText;
      this.message['sentBy'] = 'userID';
      this.message['timeStamp'] = 'time';


      this.messages.push(this.message);
      this.updateFirebase();
      this.messageText = '';
      this.message = {};
    }
    
  }

  updateFirebase(){
    this.firestore
    .collection('channels')
    .doc('tHvLHahPsEcAJ7qHsHmy')
    .update({
      messages: this.messages
    })
  }
}
