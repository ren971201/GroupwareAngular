import { HttpClient } from '@angular/common/http';
import { InformationService } from './information.service';
import { InformationLocalService } from './local.service';

export const InformationServiceProvider = {
    provide: InformationService,
    useExisting: InformationLocalService,
    deps: [HttpClient]
}
