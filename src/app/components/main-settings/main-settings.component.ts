import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss']
})
export class MainSettingsComponent implements OnInit {
  isDarkMode: boolean;

  constructor(
    public themeService: ThemeService,
    public router: Router,
    public afAuth: AngularFireAuth,
    public authProcess: AuthProcessService) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('lightMode')
      : this.themeService.update('darkMode');
  }

  async signOut() {
    await this.authProcess.signOut()
    this.router.navigate(['/']);
  }



}
