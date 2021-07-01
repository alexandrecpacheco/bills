import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
  ],
  bootstrap: [
  ]
})
export class AppModule { }
