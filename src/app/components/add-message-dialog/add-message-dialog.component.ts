import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { DirectMessage } from 'src/app/models/direct-message.class';

@Component({
  selector: 'app-add-message-dialog',
  templateUrl: './add-message-dialog.component.html',
  styleUrls: ['./add-message-dialog.component.scss']
})
export class AddMessageDialogComponent implements OnInit {

  directMessage: DirectMessage =  new DirectMessage();
  counterpartUser: any;
  counterpartId: string = '';
  counterpartName: string = '';
  selectedUsers: any = [];
  users: any = [];
  name: string = '';
  currentUserId: string = '';

  constructor(private firebaseAuth: AngularFireAuth, 
              public dialogRef: MatDialogRef<AddMessageDialogComponent>, 
              private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firebaseAuth.authState.subscribe(user => {
      console.log('User id : ', user.uid);
      this.currentUserId = user.uid;
     });

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        // console.log('Receive changes from DB', changes);
        this.users = changes.filter((user) => user.displayName != null && user.uid != this.currentUserId);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.counterpartUser = this.users.filter(user => user.uid == this.counterpartId)[0];
    console.log("counterpartUser : ", this.counterpartUser);
    this.counterpartName = this.counterpartUser.displayName;
    this.selectedUsers.push(this.currentUserId);
    this.selectedUsers.push(this.counterpartId);
    this.directMessage.userIdList = this.selectedUsers;
    this.directMessage.createdBy = this.currentUserId;

    // console.log("Selected user : ", this.users.filter((user) => user.uid == this.selectedUsers)[0]['displayName']);
    this.firestore.collection('directMessages').add(this.directMessage.toJSON()).then(
      (result:any) => {
        // console.log('Add channel : ', result);
        // console.log('Selected users : ', this.selectedUsers);
        this.dialogRef.close();
      }
    );
  }
}
