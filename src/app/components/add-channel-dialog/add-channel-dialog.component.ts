import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Channel } from 'src/app/models/channel.class';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent implements OnInit {

  channel: Channel =  new Channel();
  selectedUsers: any = [];
  users: any = [];


  constructor(public dialogRef: MatDialogRef<AddChannelDialogComponent>, 
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
    this.channel.userIdList = this.selectedUsers;
    this.firestore.collection('channels').add(this.channel.toJSON()).then(
      (result:any) => {
        // console.log('Add channel : ', result);
        // console.log('Selected users : ', this.selectedUsers);
        this.dialogRef.close();
      }
    );
  }
}
