import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/pages/login/user';

@Component({
  selector: 'app-set-status-dialog',
  templateUrl: './set-status-dialog.component.html',
  styleUrls: ['./set-status-dialog.component.scss'],
})
export class SetStatusDialogComponent implements OnInit {

  @ViewChild('status', { static: true }) statusElement: ElementRef;

  currentStatus: string = '';
  currentUser: User;

  options = [
    { optionText: 'In einem Meeting', smiley: '&#9757' },
    { optionText: 'Unterwegs', smiley: '&#9757' },
    { optionText: 'Krank', smiley: '&#9757' },
    { optionText: 'Im Urlaub', smiley: '&#9757' },
    { optionText: 'Home Office', smiley: '&#9757' },
  ];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  }

  changeStatus() {
    this.currentStatus = this.statusElement.nativeElement.value
    // console.log(this.currentUser.uid);
    this.firestore
      .collection('users')
      .doc(this.currentUser.uid)
      .set({ ...this.currentUser, statusText: this.currentStatus })
      .then((a) => {
        console.log(a);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
