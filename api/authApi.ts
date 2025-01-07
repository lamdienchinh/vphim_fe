import axiosInstance from "@/config/axiosV2";
import {
  IForgotPassword,
  ILogin,
  ILoginResponse,
  IVerifyOTP,
} from "@/types/auth";
import { AxiosResponse } from "axios";

export class AuthenApi {
  // Danh sách thể loại
  public static login(body: ILogin): Promise<AxiosResponse<ILoginResponse>> {
    return axiosInstance.post("/auth/login", body);
  }
  public static logout(): Promise<AxiosResponse<void>> {
    return axiosInstance.post("/auth/logout");
  }
  public static forgotPassword(body: IForgotPassword) {
    return axiosInstance.post("/auth/forgot-password", body);
  }
  public static verifyOTP(body: IVerifyOTP) {
    return axiosInstance.post("/otp/verify", body);
  }
}
