import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from 'src/app/pages/login/user';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit {
  email: string = '---';
  displayName: string = 'Guest';
  subscription: Subscription;
  rxTime = new Date();
  intervalId;
  currentUser: User;
  currentProfileImg: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    // if (this.currentUser.displayName) {

    // }
    this.currentProfileImg = this.data.user.photoURL;
    this.displayName = this.data.user.displayName;
    this.updateClock();
  }

  openDialog() {
    this.dialog.open(EditUserDialogComponent, {
      width: '550px',
      data: {
        animal: 'panda',
      },
    });
  }

  updateClock() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
