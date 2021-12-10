import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthProcessService } from 'ngx-auth-firebaseui';

import { ThemeService } from 'src/app/services/theme.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { SetStatusDialogComponent } from '../set-status-dialog/set-status-dialog.component';


// export interface DialogData {
//   currentUser: { uid:string, photoURL: string, providerId: string, emai};
// }

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss'],
})
export class MainSettingsComponent implements OnInit {
  isDarkMode: boolean;

  userImage: string = '../../../assets/img/user.png';
  userName: string = 'Guest';
  status: string = 'Aktiv';

  updateUser: object;

  constructor(
    public themeService: ThemeService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public authProcess: AuthProcessService,
    public dialog: MatDialog
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user.displayName) {
      this.userName = user.displayName;
      this.updateUser = { status: 'active', userImg: this.userImage, ...user };
      console.log(this.updateUser);
    }
  }

  openStatusDialog(): void {
    const dialogRef = this.dialog.open(SetStatusDialogComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateUserStatus(): void {
    this.status = 'Abwesend';
  }

  openDialog() {
    this.dialog.open(ProfileDialogComponent, {
      
      data: {

      },
    });
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
