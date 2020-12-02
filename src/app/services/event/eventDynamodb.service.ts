import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import Event from 'src/app/domain/event';
import EventService from './EventService';

@Injectable({
  providedIn: 'root'
})
export class EventDynamodbService implements EventService {

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.post('https://zd4o20m2y0.execute-api.ap-northeast-1.amazonaws.com/dev/dynamodbctrl',
    {
        "OperationType": "SCAN"
    },
    {responseType: 'text'});
  }

  getEventPage(page:number): Observable<any>{
    return from([0]);
  }
  postEventData(event:Event): void{}
  
  getTableSize(): Observable<any>{
    return from([0]);
  }
}
