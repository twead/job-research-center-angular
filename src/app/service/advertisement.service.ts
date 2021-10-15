import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdvertisementDto } from '../dto/advertisement-dto';
import { ApplicationAndEmployeeDto } from '../dto/application-and-employee-dto';
import { NewAdvertisement } from '../dto/new-advertisement';
import { NumberOfRecords } from '../dto/number-of-records';
import { RequestDto } from '../dto/request-dto';
import { Advertisement } from '../model/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  authURL = environment.authURL;
  employerURL = environment.employerURL;
  employeeURL = environment.employeeURL;

  constructor(private httpClient: HttpClient) { }

  public addAdvertisement(email: string, newAdvertisement: NewAdvertisement): Observable<any> {
    return this.httpClient.post<any>(this.employerURL + 'create/' + email, newAdvertisement);
  }

  public getNumberOfRecords(): Observable<any> {
    return this.httpClient.get<NumberOfRecords>(this.authURL + 'count');
  }

  public getAllAdvertisement(): Observable<Array<Advertisement>> {
    return this.httpClient.get<Array<Advertisement>>(this.employeeURL + 'list_advertisement');
  }

  public getAdvertisementDetails(id: number): Observable<any> {
    return this.httpClient.get<AdvertisementDto>(this.employeeURL + 'details_advertisement/' + id);
  }

  public getAllMyAdvertisement(email: string, requestDto: RequestDto): Observable<Array<Advertisement>> {
    return this.httpClient.post<Array<Advertisement>>(this.employerURL + 'list_my_advertisements/' + email, requestDto);
  }

  public getMyAdvertisement(email: string, requestDto: RequestDto): Observable<Advertisement> {
    return this.httpClient.post<Advertisement>(this.employerURL + 'get_my_advertisement/' + email, requestDto);
  }

  public updateAdvertisement(id: number, advertisement: Advertisement): Observable<Advertisement> {
    return this.httpClient.put<Advertisement>(this.employerURL + 'update_advertisement/' + id, advertisement);
  }

  public deleteAdvertisement(id: number) {
    return this.httpClient.delete(this.employerURL + 'advertisement/delete/' + id);
  }

}
