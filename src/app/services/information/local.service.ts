import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import Information from 'src/app/domain/Information';
import { InformationService } from './information.service';

@Injectable({
  providedIn: 'root'
})
export class InformationLocalService extends InformationService  {
  constructor(client:HttpClient) {
    super(client);
  }

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
