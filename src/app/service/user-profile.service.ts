import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userURL = environment.userURL;

  constructor(private httpClient: HttpClient) { }

  public getProfileDetails(email: string): Observable<User>{
    return this.httpClient.get<User>(this.userURL+'details/' + email);
  }

  public updateProfile(email: string, profile: User): Observable<User>{
    return this.httpClient.put<User>(this.userURL+'update/' + email, profile);
  }

  public updatePassword(email: string, password: string){
    return this.httpClient.put(this.userURL+'password-update/' + email, password);
  }

}