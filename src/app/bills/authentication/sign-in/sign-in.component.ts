import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

  auth() {
    var firebase = require('firebase');
    var firebaseui = require('firebaseui');

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
        }
      ],
      // Other config options...
    });

  }

}
