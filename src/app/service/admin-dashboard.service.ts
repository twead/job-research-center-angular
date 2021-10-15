import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  dashboardURL = environment.dashboardURL;

  constructor(private httpClient: HttpClient) { }

  public getAllEmployee(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.dashboardURL + 'employees');
  }

  public getAllEmployer(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.dashboardURL + 'employers');
  }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.dashboardURL + 'user/details/' + id);
  }

  public updateUser(id: number, employee: User): Observable<User> {
    return this.httpClient.put<User>(this.dashboardURL + 'user/update/' + id, employee);
  }

  public setValidationToEmployer(id: number) {
    return this.httpClient.get(this.dashboardURL + 'employer/set-validation/' + id);
  }

  public deleteEmployee(id: number) {
    return this.httpClient.delete(this.dashboardURL + 'employee/delete/' + id);
  }

  public deleteEmployer(id: number) {
    return this.httpClient.delete(this.dashboardURL + 'employer/delete/' + id);
  }

}