import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  email: string = '---';
  displayName: string = 'Guest';
  subscription: Subscription;
  rxTime = new Date();
  intervalId;


  constructor() { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(user);
    if (user.displayName) {
      this.email = user.email;
      this.displayName = user.displayName;
    }
    this.updateClock();
  }


  updateClock() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
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
