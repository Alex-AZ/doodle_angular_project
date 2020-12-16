import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyB0rC6LE6Ket9g5CihSBl_CCyv7yFLX4eo",
      authDomain: "doodle-angular-project.firebaseapp.com",
      projectId: "doodle-angular-project",
      storageBucket: "doodle-angular-project.appspot.com",
      messagingSenderId: "192973351248",
      appId: "1:192973351248:web:4b6b64c03d67aa44c16455"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}
