import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import Event from '../../domain/Event'

@Injectable({
    providedIn: 'root'
})
export class EventService {
    constructor(protected http: HttpClient) { }

    getEvents(): Observable<any>{
        return from([0]);
    }
  
    getEventPage(page:number): Observable<any>{
      return from([0]);
    }
    postEventData(event:Event): void{}
    
    getTableSize(): Observable<any>{
      return from([0]);
    }
  }
  