import { Observable } from 'rxjs';
import Information from '../../domain/Information'

export default interface InformationService {
    getInformation(): Observable<any>;
    getInformationPage(page:number): Observable<any>;
    postInformationData(information:Information): void;
    getTableSize(): Observable<any>;
}
  