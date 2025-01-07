export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
}

export interface IChangePasswordDTO {
  password: string;
  accessToken?: string;
}