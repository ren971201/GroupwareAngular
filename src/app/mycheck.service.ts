import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'

class MyData {
  information:Information[] = [];
  list:Event[] = [];
}

class Information {
  item:string;
}
class Event {
  event:string;
  schedule:string;
  place:string;
  start:string;
  end:string;
}
@Injectable({
  providedIn: 'root'
})
export class MycheckService {
  private mydata = new MyData();

  constructor(private client:HttpClient) {
    this.client.get('/assets/data.json')
      .subscribe((result:MyData) => {
        this.mydata = result;
      });
  }

  get(n:number) {
    return this.mydata.list[n];
  }

  get event() {
    return this.mydata.list;
  }

  get information() {
    return this.mydata.information;
  }
}
