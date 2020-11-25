import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Event from '../domain/Event';

class MyData {
  information:Information[] = [];
  list:Event[] = [];
}

class Information {
  item:string;
}
@Injectable({
  providedIn: 'root'
})
export class LocalService {
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
