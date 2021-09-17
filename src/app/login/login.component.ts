import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    ui: firebaseui.auth.AuthUI;

    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    ngOnInit(): void {
        this.afAuth.app.then((app) => {
            const uiConfig = {
                signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID],
                callbacks: {
                    signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
                },
            };

            this.ui = new firebaseui.auth.AuthUI(app.auth());
            this.ui.start('#firebaseui-auth-container', uiConfig);

            this.ui.disableAutoSignIn(); //remove for production @Rob
        });
    }

    onLoginSuccessful(results): void {
        console.log('Firebase UI result: ', results);
        this.router.navigateByUrl('/');
    }

    ngOnDestroy(): void {
        this.ui.delete();
    }
}
