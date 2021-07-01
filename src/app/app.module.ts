import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CreateBillsComponent } from './bills/create-bills/create-bills.component';
import { DetailBillsComponent } from './bills/detail-bills/detail-bills.component';
import { ListBillsComponent } from './bills/list-bills/list-bills.component';
import { BillsService } from './bills/bills.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    CreateBillsComponent,
    DetailBillsComponent,
    ListBillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
    MatDividerModule
  ],
  providers: [
    BillsService,
    FormControl
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
