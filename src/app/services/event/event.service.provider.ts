import { EventServiceMongodb } from './eventMongodb.service';
import { HttpClient } from '@angular/common/http';
import { EventServiceDynamodb } from './eventDynamodb.service';
import { USE_MONGODB } from 'src/app/app.config';
import { EventService } from './event.service';

const EventServiceFactory = (useMongoDB:boolean,http:HttpClient) => {                
    return useMongoDB ? new EventServiceMongodb(http) : new EventServiceDynamodb(http);
}

export const EventServiceProvider = {
    provide: EventService,
    useFactory: EventServiceFactory,
    deps: [USE_MONGODB, HttpClient]
}
