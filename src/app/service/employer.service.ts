import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  employerURL = environment.employerURL;

  constructor(private httpClient: HttpClient) { }

  public isValidated(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.employerURL + 'isValidated/' + email);
  }
}
