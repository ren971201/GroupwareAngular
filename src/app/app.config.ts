import { InjectionToken } from '@angular/core';

export const USE_MONGODB = new InjectionToken<boolean>('AppConfig', {
    providedIn: 'root',
    factory: () => true
});