import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationAndEmployeeDto } from '../dto/application-and-employee-dto';
import { ApplicationDto } from '../dto/application-dto';
import { NewApplication } from '../dto/new-application';
import { RequestDto } from '../dto/request-dto';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  employeeURL = environment.employeeURL;
  employerURL = environment.employerURL;

  constructor(private httpClient: HttpClient) { }

  public addApplication(email: string, newApplication: NewApplication): Observable<any> {
    return this.httpClient.post<any>(this.employeeURL + 'apply/' + email, newApplication);
  }

  public getAllMyApplication(email: string): Observable<Array<ApplicationDto>> {
    return this.httpClient.get<Array<ApplicationDto>>(this.employeeURL + 'list_applications/' + email);
  }

  public getApplicationDetails(email: string, requestDto: RequestDto): Observable<any> {
    return this.httpClient.post<ApplicationDto>(this.employeeURL + 'details_application/' + email, requestDto);
  }

  public getAllApplicationAndEmployee(id: number): Observable<Array<ApplicationAndEmployeeDto>> {
    return this.httpClient.get<Array<ApplicationAndEmployeeDto>>(this.employerURL + 'get_applications_and_employees/' + id);
  }

  public getApplicationAndEmployeeDetails(email: string, requestDto: RequestDto): Observable<ApplicationAndEmployeeDto> {
    return this.httpClient.post<ApplicationAndEmployeeDto>(this.employerURL + 'get_application_and_employee_details/' + email, requestDto);
  }

  public deleteApplication(id: number) {
    return this.httpClient.delete(this.employerURL + 'application/delete/' + id);
  }

}
