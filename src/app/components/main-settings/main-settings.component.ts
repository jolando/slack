import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthProcessService } from 'ngx-auth-firebaseui';
import { User } from 'src/app/pages/login/user';

import { ThemeService } from 'src/app/services/theme.service';
import { UpdatefirebaseService } from 'src/app/services/updatefirebase.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { SetStatusDialogComponent } from '../set-status-dialog/set-status-dialog.component';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss'],
})
export class MainSettingsComponent implements OnInit {
  isDarkMode: boolean;

  userName: string;
  status: boolean = true;

  updateUser;
  profileImg: string = '';

  currentUser: User;

  constructor(
    public themeService: ThemeService,
    public router: Router,
    public authProcess: AuthProcessService,
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private updateFirestoreService: UpdatefirebaseService
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    this.afs
      .collection('users')
      .doc(this.currentUser.uid)
      .valueChanges()
      .subscribe((docRef) => {
        this.updateUser = docRef;
      });
    this.profileImg = this.updateUser.photoUrL;
  }

  openStatusDialog(): void {
    const dialogRef = this.dialog.open(SetStatusDialogComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  updateUserStatus() {
    const onlineValue = (this.status = !this.status);
    this.updateFirestoreService.updateFirestore('onlineStatus', onlineValue);
  }

  openDialog() {
    let dialog = this.dialog.open(ProfileDialogComponent, {
      width: '550px',
    });
    if (this.updateUser) {
      dialog.componentInstance.updateUser = this.updateUser;
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('lightMode')
      : this.themeService.update('darkMode');
  }

  async signOut(): Promise<void> {
    await this.authProcess.signOut();
    this.router.navigate(['/']);
  }
}
