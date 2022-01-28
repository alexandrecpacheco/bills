import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BillsService } from '../../bills.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  form!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private billsService : BillsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    //this.authentication();
  }

  createForm(): void {
    this.form = this.fb.group({
      Email: new FormControl({value: ""}),
      Password: new FormControl({value: ""})
    });
  }


  // authentication() {
  //   debugger;
  //   var firebase = require('firebase');
  //   var firebaseui = require('firebaseui');

  //   var ui = new firebaseui.auth.AuthUI(firebase.auth());

  //   ui.start('#firebaseui-auth-container', {
  //     signInOptions: [
  //       {
  //       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //       requireDisplayName: false
  //       }
  //     ]
  //   });
  // }

  signIn() {
    debugger;
    if (this.form.valid){
      this.billsService.signInUser(this.email, this.password);
    }
  }
}
