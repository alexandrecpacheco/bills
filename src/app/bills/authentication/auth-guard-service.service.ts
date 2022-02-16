import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor() { }

  getToken(){  
    return !!localStorage.getItem("SessionUser");
  }  
}
