
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { User } from 'src/app/pages/login/user';
import { chatMessage } from 'src/app/models/chatMessage.class';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})



export class ChatComponent implements OnInit {
  messageText: string = '';
  message: chatMessage;
  messagesAsJSON = [];
  messagesAsObject = [];
  currentUser: User;
  chatUsers = [];
  currentChat;

  @ViewChild('messages') private myScrollContainer: ElementRef;


  constructor(private router: Router, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.subscribeChat();
    this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
console.log(this.currentUser.photoUrl);

  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {

    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 200);


  }

  subscribeChat() {
    this.firestore
      .collection('channels')
      .doc('1jhjwerWlj2ew4IDaO9Q')
      .valueChanges()
      .subscribe((changes: any) => {

        this.currentChat = changes;

        this.getChatUsers();
        this.messagesAsJSON = this.currentChat.messages ? this.currentChat.messages : [];
        this.parseAsObject();

      });
  }

  getChatUsers() {
    let chatUsers = [];
    this.currentChat.userIdList.forEach(userId => {
      console.log(userId);
      this.firestore
        .collection("users")
        .doc(userId)
        .get()
        .toPromise()
        .then((user: any) => {
          chatUsers.push(user.data())
           
        })
    })
    this.chatUsers = chatUsers;

  }


  parseAsObject() {
    let messagesAsObject = [];
    this.messagesAsJSON.forEach(message => {
      let messageAsObject = new chatMessage(
        message.messageText,
        message.sentBy,
        message.timeStamp
      )
      messagesAsObject.push(messageAsObject);
    });

    this.messagesAsObject = messagesAsObject;

  }

  sendMessage(event?) {

    if (event) {
      event.preventDefault();
    }

    if (this.messageText.replace(/\s/g, '').length) {

      this.createMessage();

      this.messagesAsJSON.push(this.message.toJSON());

      this.updateFirebase();
      this.messageText = '';
      this.scrollToBottom();
    }

  }

  createMessage() {
    this.message = new chatMessage(
      this.messageText,
      this.currentUser.displayName);
  }



  updateFirebase() {
    this.firestore
      .collection('channels')
      .doc('1jhjwerWlj2ew4IDaO9Q')
      .update({
        messages: this.messagesAsJSON
      })
  }

}
