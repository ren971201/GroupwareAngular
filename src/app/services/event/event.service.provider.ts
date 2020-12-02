import { EventMongodbService } from './eventMongodb.service';
import { HttpClient } from '@angular/common/http';
import { EventDynamodbService } from './eventDynamodb.service';
import { USE_MONGODB } from 'src/app/app.config';
import { InjectionToken } from '@angular/core';
import EventService from './eventService';

const EventServiceFactory = (useMongoDB:boolean,http:HttpClient) => {                
    return useMongoDB ? new EventMongodbService(http) : new EventDynamodbService(http);
}

export const EVENT_SERVICE = new InjectionToken<EventService>('event.service.provider');

export const EventServiceProvider = {
    provide: EVENT_SERVICE,
    useFactory: EventServiceFactory,
    deps: [USE_MONGODB, HttpClient]
}


// {provide:'USE_FAKE', useValue: true},             
// {provide: 'ProductService', ,                  
//      deps: ['USE_FAKE',HttpClient]}           
