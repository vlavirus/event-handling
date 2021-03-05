export interface Environment {
  production: boolean;
  apiKey: string;
  fbDbUrl: string;
  firebaseConfig: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
  }
}

export interface FbAuthResponse {
  production: boolean;
  idToken: string;
  exspiresIn: string;
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
}

