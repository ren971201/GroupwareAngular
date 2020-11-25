// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  limitPage: 5, // 指定回数(1ページに表示する項目の数)を定義
  listPlace:[// 場所の一覧
    { name : "ミーティングルーム1" },
    { name : "ミーティングルーム2" },
    { name : "ミーティングルーム4" },
    { name : "応接室" },
    { name : "特別会議室" },
    { name : "休憩室" },
    { name : "roomR" },
    { name : "roomB" },
    { name : "roomY" },
    { name : "roomG" }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
