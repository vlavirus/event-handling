export interface Environment {
  production: boolean;
  apiKey: string;
  fbDbUrl: string;
  firebaseConfig: {}
}

export interface FbAuthResponse {
  idToken: string;
  exspiresIn: string;
}

