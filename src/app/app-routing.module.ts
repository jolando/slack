import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'', component: LoginComponent },
  { path:'home', component: MenuComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
