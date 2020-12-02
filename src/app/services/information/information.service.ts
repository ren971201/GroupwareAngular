import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import Information from '../../domain/Information'

export class InformationService {
    constructor(protected client:HttpClient) {  }

    getInformation(): Observable<any>{
        return from([0]);
    }
  
    getInformationPage(page:number): Observable<any>{
      return from([0]);
    }
    postInformationData(information:Information): void{}
    
    getTableSize(): Observable<any>{
      return from([0]);
    }
  }
  