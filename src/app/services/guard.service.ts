import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class GuardService implements CanActivate {
    constructor(
      public authenticationService: AuthenticationService
    ) {}

    canActivate(): boolean {
      return this.authenticationService.isAuthenticated();
    }

}