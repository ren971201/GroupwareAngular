import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import EventService from './eventService';
import Event from '../../domain/event';

@Injectable({
    providedIn: 'root',
  })

export class EventMongodbService implements EventService{
    constructor(private http: HttpClient){ }

    getEvents(): Observable<any> {
        return this.http.get('/api/v1/events');
    }

    getEventPage(page:number): Observable<any> {
        return this.http.get('/api/v1/events/?limit='+environment.limitPage+'&offset='+((page-1)*environment.limitPage));
    }

    postEventData(event:Event){
        this.http.post('/api/v1/events',event, {responseType: 'text'})
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            }
        );// これでリクエストが送信可能
    
    }

    getTableSize():Observable<any> {
        return this.http.get('/api/v1/events/size');
    }
}