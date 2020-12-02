import { Injectable } from "@angular/core";
import { USE_MONGODB } from 'src/app/app.config';
import { EventDynamodbService } from './eventDynamodb.service';
import { EventMongodbService } from './eventMongodb.service';
import EventService from './eventService';

@Injectable({
    providedIn:'root'
})

export class EventDBService {
    eventService:EventService;
    constructor(private eventMongodb:EventMongodbService, private eventDynamodb:EventDynamodbService){
        this.eventService = USE_MONGODB? eventMongodb : eventDynamodb;
    }
}