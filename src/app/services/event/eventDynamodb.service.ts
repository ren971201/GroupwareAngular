import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventServiceDynamodb extends EventService {
  constructor(http: HttpClient) {
    super(http);
  }

  getEvents(){
    return this.http.post('https://zd4o20m2y0.execute-api.ap-northeast-1.amazonaws.com/dev/dynamodbctrl',
    {
        "OperationType": "SCAN"
    },
    {responseType: 'text'});
  }
}
