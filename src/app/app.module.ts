import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CreateBillsComponent } from './bills/create-bills/create-bills.component';
import { DetailBillsComponent } from './bills/detail-bills/detail-bills.component';
import { ListBillsComponent } from './bills/list-bills/list-bills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { SignInComponent } from './bills/authentication/sign-in/sign-in.component';
import { SignOutComponent } from './bills/authentication/sign-out/sign-out.component';
import { AuthGuardServiceService } from './bills/authentication/auth-guard-service.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { LogInComponent } from './bills/authentication/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBillsComponent,
    DetailBillsComponent,
    ListBillsComponent,
    SignInComponent,
    SignOutComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    
    NgxLoadingModule.forRoot({ 
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
    }),
    
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  providers: [
    FormControl,
    AuthGuardServiceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
