import { InjectionToken } from '@angular/core';

export const USE_MONGODB = new InjectionToken<boolean>('use mongoDB');// 依存オブジェクトにするためのトークン

export const useMongoDB:boolean = true;// DynamoDBに切り替える場合は　false

// export const USE_MONGODB = new InjectionToken<boolean>('AppConfig', {
//     providedIn: 'root',
//     factory: () => true
// });