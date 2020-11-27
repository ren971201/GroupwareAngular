import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import Information from 'src/app/domain/Information';
import InformationService from './informationService';

@Injectable({
  providedIn: 'root'
})
export class LocalService implements InformationService  {
  constructor(private client:HttpClient) {  }

  getInformation(){
    return this.client.get('/assets/data.json');
  }

  getInformationPage(page:number): Observable<any>{
    return from([0]);
  }
  postInformationData(information:Information): void{}
  
  getTableSize(): Observable<any>{
    return from([0]);
  }

}
