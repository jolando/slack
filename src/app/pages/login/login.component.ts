import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthProcessService, AuthProvider } from 'ngx-auth-firebaseui';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;

  event: any;

  currentUser: User = {
    uid: '',
    photoUrl: '',
    email: '',
    providerId: '',
    displayName: '',
  };

  constructor(
    private router: Router,
    public authProcess: AuthProcessService,
    public afs: AngularFirestore
  ) { }

  ngOnInit(): void { }

  printUser(event) {
    console.log(event);

    this.currentUser = {
      uid: event.uid,
      email: event.email,
      photoUrl: event.photoUrl,
      displayName: event.displayName,
      providerId: event.providerId,
    };
    this.router.navigateByUrl('/home');
    // this.afs.firestore
    //   .collection('users')
    //   .doc(event.uid)
    //   .get()
    //   .then(el => this.user.push(el.data()))
    sessionStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));
  }

  printError(event: any) {
    console.error(event.message);
    this.event = event;
  }
}
