import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../pages/login/user';



@Injectable({
  providedIn: 'root',
})
export class UpdatefirebaseService {
  currentUser: User;

  constructor(private firestore: AngularFirestore) {
    this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(this.currentUser.uid);
  }

  updateFirestore( key: string, value: any ) {
    this.firestore
      .collection('users')
      .doc(this.currentUser.uid)
      .update({ [key] : value });
  }
}
