
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})



export class ChatComponent implements OnInit {
  message: string = '';
  messages = [];



  constructor(private router: Router, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    
    this.firestore
    .collection('channels')
    .doc('tHvLHahPsEcAJ7qHsHmy')
    .valueChanges()
    .subscribe((changes: any) =>{
      console.log(changes);
      
      //this.messages = changes;
    });
    
  }

  sendMessage(event?){
    
    if(event){
      event.preventDefault();
    }
    
    if(this.message.replace(/\s/g, '').length){
      
      this.message = '';
      
    }
    
  }

  updateFirebase(){
    this.firestore
    .collection('channels')
    .doc('tHvLHahPsEcAJ7qHsHmy')
    .update({
      messages: this.message
    })
  }
}
