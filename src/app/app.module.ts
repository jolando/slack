import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { AddChannelDialogComponent } from './components/add-channel-dialog/add-channel-dialog.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTreeModule} from '@angular/material/tree';
import {MatInputModule} from '@angular/material/input';
import { ChatComponent } from './components/chat/chat.component';

import { MatMenuModule } from '@angular/material/menu';

import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectMessagesComponent } from './components/direct-messages/direct-messages.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MainSettingsComponent } from './components/main-settings/main-settings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddMessageDialogComponent } from './components/add-message-dialog/add-message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ChatComponent,
    ChannelsComponent,
    AddChannelDialogComponent,
    DirectMessagesComponent,
    MainSettingsComponent,
    AddMessageDialogComponent,
  ],

  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot(
      {
        apiKey: 'AIzaSyAgCDsEUsuU3eaIPRp4h_1A0pkZrM_-sdo',
        authDomain: 'slack-a9dc2.firebaseapp.com',
        projectId: 'slack-a9dc2',
        storageBucket: 'slack-a9dc2.appspot.com',
        messagingSenderId: '854751646610',
        appId: '1:854751646610:web:65dba9234d0df5db6aa74b',
      },
      () => 'your_app_name_factory',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/home', // url for authenticated users - to use in combination with canActivate feature on a route

        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: false,
        enableEmailVerification: true, // default: true
        useRawUserCredential: false, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
      }
    ),

    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    FontAwesomeModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
