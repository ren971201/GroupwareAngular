import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamodbService {

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.post('https://zd4o20m2y0.execute-api.ap-northeast-1.amazonaws.com/dev/dynamodbctrl',
    {
        "OperationType": "SCAN"
    },
    {responseType: 'text'});
  }
}
