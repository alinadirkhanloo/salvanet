export interface User {
  accessToken: string; // auth token
  refreshToken:string;
  idToken: string; // user info
}

export interface IDToken {
  firstName: string;
  lastName: string;
  role: string;
  permissions: string;
  activated: boolean
}
