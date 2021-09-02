import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../dto/jwt-dto';
import { LoginUser } from '../dto/login-user';
import { NewUser } from '../dto/new-user';

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

}
