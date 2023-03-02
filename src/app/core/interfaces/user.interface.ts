export interface User {
  accessKey: string; // auth token
  idToken: string; // user info
}

export interface IDToken {
  firstName: string;
  lastName: string;
  role: string;
  permissions: string;
  activated: boolean
}
