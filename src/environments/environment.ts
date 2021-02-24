// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import { Environment } from './interface';

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyB5PCxTE7Iwu581Iu77dOHZOiHuV8jYojU',
  fbDbUrl: 'https://event-handling-89ad3-default-rtdb.firebaseio.com/',
  firebaseConfig: {
    apiKey: 'AIzaSyB5PCxTE7Iwu581Iu77dOHZOiHuV8jYojU',
    authDomain: 'event-handling-89ad3.firebaseapp.com',
    databaseURL: 'https://event-handling-89ad3-default-rtdb.firebaseio.com',
    projectId: 'event-handling-89ad3',
    storageBucket: 'event-handling-89ad3.appspot.com',
    messagingSenderId: '783363726649',
    appId: '1:783363726649:web:1881c097b109d3e695dce8',
    measurementId: 'G-4SVP36NWRM'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
