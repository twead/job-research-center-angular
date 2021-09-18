import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewAdvertisement } from '../dto/new-advertisement';


@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  employerURL = environment.employerURL;

  constructor(private httpClient: HttpClient) { }

  public addAdvertisement(email: string, newAdvertisement: NewAdvertisement): Observable<any>{
    return this.httpClient.post<any>(this.employerURL+'create/'+ email,newAdvertisement);
  }
}
