import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './bills/authentication/auth.guard';
import { LogInComponent } from './bills/authentication/log-in/log-in.component';
import { SignInComponent } from './bills/authentication/sign-in/sign-in.component';
import { CreateBillsComponent } from './bills/create-bills/create-bills.component';
import { ListBillsComponent } from './bills/list-bills/list-bills.component';
 
const routes: Routes = [
  { 
    path: '', redirectTo: 'signIn', pathMatch: 'full'
  },
  {
    path: 'signIn', component: SignInComponent
  },
  { 
    path: 'bills', component: ListBillsComponent, canActivate: [AuthGuard]
  },
  { 
    path: 'add', component: CreateBillsComponent, canActivate: [AuthGuard]
  },
  { 
    path: 'logIn', component: LogInComponent
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }