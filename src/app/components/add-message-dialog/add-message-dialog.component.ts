import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/app/models/message.class';

@Component({
  selector: 'app-add-message-dialog',
  templateUrl: './add-message-dialog.component.html',
  styleUrls: ['./add-message-dialog.component.scss']
})
export class AddMessageDialogComponent implements OnInit {

  message: Message =  new Message();
  selectedUsers: any = [];
  users: any = [];
  name: string = '';

  constructor(public dialogRef: MatDialogRef<AddMessageDialogComponent>, 
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        // console.log('Receive changes from DB', changes);
        this.users = changes.filter((item) => item.displayName != null);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.message.userIdList = this.selectedUsers;
    // console.log("Selected user : ", this.users.filter((user) => user.uid == this.selectedUsers)[0]['displayName']);
    this.firestore.collection('directMessages').add(this.message.toJSON()).then(
      (result:any) => {
        // console.log('Add channel : ', result);
        // console.log('Selected users : ', this.selectedUsers);
        this.dialogRef.close();
      }
    );
  }
}
