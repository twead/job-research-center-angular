import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  role: String;

  constructor(
    private router : Router
  ) {}

  public setToken(token: string): void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }

  public getEmail(): string {
    if(!this.isLogged()){
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const email = values.sub;
    return email;
  }

  public IsEmployer(): boolean {
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const role = values.role;
    if(role=='ROLE_EMPLOYER'){
      return false;
    }
    return true;
  }

  public IsEmployee(): boolean {
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const role = values.role;
    if(role=='ROLE_EMPLOYEE'){
      return false;
    }
    return true;
  }

  public IsAdmin(): boolean {
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const role = values.role;
    if(role=='ROLE_ADMIN'){
      return false;
    }
    return true;
  }

  public logOut():void{
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
