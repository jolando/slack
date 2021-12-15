import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Channel } from 'src/app/models/channel.class';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AngularFireAuth } from '@angular/fire/auth';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  channel: Channel =  new Channel();
  selectedUsers: any = [];
  users: any = [];
  currentUserId: string = '';


  constructor(private firebaseAuth: AngularFireAuth, 
              public dialogRef: MatDialogRef<AddChannelDialogComponent>, 
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
        this.users = changes.filter((item) => item.displayName != null);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('Selected users : ', this.selectedUsers);
    this.channel.createdBy = this.currentUserId;
    this.selectedUsers.push(this.currentUserId);
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
