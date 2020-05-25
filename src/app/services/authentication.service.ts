import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage
      .get('user')
      .then((response) => {
        if (response) {
          this.authState.next(true);
        }
    });
  }

  login() {
    var payloadExample = {
      username: 'bulukcuy',
      email: 'bulukcuy@mamalia.com'
    };

    this.storage
      .set('user', payloadExample)
      .then((response) => {
        this.router.navigate(['dashboard']);
        this.authState.next(true);
    });
  }

  logout() {
    this.storage
      .remove('user').then(() => {
        this.router.navigate(['login']);
        this.authState.next(false);
      });
  }

  isAuthenticated() {
    return this.authState.value;
  }

}