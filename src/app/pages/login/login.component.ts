import { Component, OnInit } from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  printUser(event) {
    console.log(event);
    this.router.navigateByUrl('/home');
}

  printError(event) {
    console.error(event);
  }
}
