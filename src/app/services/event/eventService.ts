import { Observable } from 'rxjs';
import Event from '../../domain/Event'

export default interface EventService {
    getEvents(): Observable<any>;
    getEventPage(page:number): Observable<any>;
    postEventData(event:Event): void;
    getTableSize(): Observable<any>;
}
  