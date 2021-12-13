import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';

import { LoggedInGuard } from 'ngx-auth-firebaseui';

import { ImprintComponent } from './components/imprint/imprint.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';

//import { ChatComponent } from './components/chat/chat.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: MenuComponent, canActivate: [LoggedInGuard] },
  { path: 'imprint', component: ImprintComponent, outlet: 'main-content', canActivate: [LoggedInGuard] },
  { path: 'data-privacy', component: DataPrivacyComponent, outlet: 'main-content', canActivate: [LoggedInGuard] },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

