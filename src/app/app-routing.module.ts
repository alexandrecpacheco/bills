import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBillsComponent } from './bills/create-bills/create-bills.component';
import { ListBillsComponent } from './list-bills/list-bills.component';
 
const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'bills', 
    pathMatch: 'full' 
  },
  { 
    path: 'bills', 
    component: ListBillsComponent
  },
  { 
    path: 'add', 
    component: CreateBillsComponent
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }