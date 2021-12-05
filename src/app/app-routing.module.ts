import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';

import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'home', component: MenuComponent,  canActivate:[LoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
