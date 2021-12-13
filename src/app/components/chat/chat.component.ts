
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})



export class ChatComponent implements OnInit {
  message: string = '';
  messages = [];
  chat;


  constructor(private router: Router, public firestore: AngularFirestore) { }
    

  ngOnInit(): void {
    
    console.log(this.firestore);
    
    this.firestore
    .collection('channels')
    .doc('tHvLHahPsEcAJ7qHsHmy')
    .valueChanges()
    .subscribe((changes: any) =>{
      this.chat = changes;
    });
    
  }

  sendMessage(event?){
    
    if(event){
      event.preventDefault();
    }
    
    if(this.message.replace(/\s/g, '').length){
      // this.messages.push(this.message);
      
      this.firestore
      .collection('channels')
      .doc('tHvLHahPsEcAJ7qHsHmy')
      .update({
        // messages: this.firestore.FieldValue.arrayUnion(this.message)
      })
      this.message = '';
      
    }
    
  }

}
