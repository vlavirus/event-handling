export interface Environment {
  production: boolean;
  apiKey: string;
}

export interface FbAuthResponse {
  idToken: string;
  exspiresIn: string;
}
