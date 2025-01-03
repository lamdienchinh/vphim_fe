import axiosInstance from "@/config/axiosV2";
import { ILogin, ILoginResponse } from "@/types/auth";
import { AxiosResponse } from "axios";

export class AuthenApi {
  // Danh sách thể loại
  public static login(body: ILogin): Promise<AxiosResponse<ILoginResponse>> {
    return axiosInstance.post("/auth/login", 
      body,
    );
  }
  public static logout (): Promise<AxiosResponse<void>> {
    return axiosInstance.post("/auth/logout");
  }
}
