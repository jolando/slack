import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthProcessService, AuthProvider } from 'ngx-auth-firebaseui';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;

  event: any;

  @ViewChild('output') outputDiv: any;

  constructor(
    private router: Router,
    public authProcess: AuthProcessService,
    public afs: AngularFirestore
  ) {}

  ngOnInit(): void {}

  printUser(event) {
    console.log(event);
    this.router.navigateByUrl('/home');

    let users = this.afs.firestore
      .collection('users')
      .doc(event.uid)
      .get()
      .then((el) => console.log(el.data()));
    console.log(users);
  }

  printError(event: any) {
    console.error(event.message);
    this.event = event;
  }
}
