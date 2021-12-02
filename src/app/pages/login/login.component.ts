import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthProcessService, AuthProvider } from 'ngx-auth-firebaseui';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;

  event: any;

  @ViewChild('output') outputDiv: any;

  constructor(private router: Router, public authProcess: AuthProcessService) {}

  ngOnInit(): void {}

  printUser(event) {
    console.log(event);
    // this.router.navigateByUrl('/home');
    this.event = event;
  }

  printError(event: any) {
    console.error(event.message);
    this.event = event;
  }
}
