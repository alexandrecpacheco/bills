import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardServiceService } from './auth-guard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authguardservice: AuthGuardServiceService, private router: Router){}
  canActivate(): boolean {
    debugger;
    if (!this.authguardservice.getToken()){
      this.router.navigateByUrl("/signIn");
    }
    return this.authguardservice.getToken();
  }
}
