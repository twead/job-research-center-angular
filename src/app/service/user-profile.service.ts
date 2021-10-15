import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateEmailDto } from '../dto/update-email-dto';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userURL = environment.userURL;

  constructor(private httpClient: HttpClient) { }

  public getProfileDetails(email: string): Observable<User> {
    return this.httpClient.get<User>(this.userURL + 'details/' + email);
  }

  public updateProfile(email: string, profile: User): Observable<User> {
    return this.httpClient.put<User>(this.userURL + 'update/' + email, profile);
  }

  public updateEmail(email: string, updateEmail: UpdateEmailDto): Observable<any> {
    return this.httpClient.post<User>(this.userURL + 'update_email/' + email, updateEmail);
  }

  public updateEmailActivation(code: string) {
    return this.httpClient.get(this.userURL + 'update_email_activation/' + code);
  }

  public updatePassword(email: string, password: string) {
    return this.httpClient.put(this.userURL + 'password-update/' + email, password);
  }

}