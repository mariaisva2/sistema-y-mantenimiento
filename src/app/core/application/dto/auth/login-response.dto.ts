export interface ILoginResponse {
    statusCode: number;
    message: string;
    data: DataLogin;
  }
  
  export interface DataLogin {
    access_token: string;
    user: User;
  }
  
  export interface User {
    email: string;
    id: number;
  }