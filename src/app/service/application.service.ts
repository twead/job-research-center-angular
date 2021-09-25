import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationDto } from '../dto/application-dto';
import { NewApplication } from '../dto/new-application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  employeeURL = environment.employeeURL;

  constructor(private httpClient: HttpClient) { }

  public addApplication(email: string, newApplication: NewApplication): Observable<any> {
    return this.httpClient.post<any>(this.employeeURL + 'apply/' + email, newApplication);
  }

  public getAllMyApplication(email: string): Observable<Array<ApplicationDto>> {
    return this.httpClient.get<Array<ApplicationDto>>(this.employeeURL + 'list_applications/' + email);
  }

  public getApplicationDetails(id: number): Observable<any> {
    return this.httpClient.get<ApplicationDto>(this.employeeURL + 'details_application/' + id);
  }
}
