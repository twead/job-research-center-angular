import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../dto/jwt-dto';
import { LoginUser } from '../dto/login-user';
import { NewUser } from '../dto/new-user';
import { UpdatePasswordDto } from '../dto/update-password-dto';
import { ForgotPasswordDto } from '../dto/forgot-password-dto';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  public addUser(newUser: NewUser): Observable<any>{
    return this.httpClient.post<any>(this.authURL+'registration',newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL+'login',loginUser);
  }

  public refresh(dto: JwtDto): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL+'refresh',dto);
  }

  public activation(code: string){
    return this.httpClient.get(this.authURL+'activation/'+code);
  }

  public forgotPassword(email: ForgotPasswordDto){
    return this.httpClient.post<User>(this.authURL+'forgot-password',email);
  }

  public resetPassword(code: string): Observable<User>{
    return this.httpClient.get<User>(this.authURL+'reset-password/'+code);
  }

  public updatePassword(code: string, password: UpdatePasswordDto){
    return this.httpClient.post<User>(this.authURL+'update-password/'+code, password);
  }

}
