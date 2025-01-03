import axiosInstance from "@/config/axiosV2";
import { IUser } from "@/types/user";
import { AxiosResponse } from "axios";

export class UserApi {
  // Danh sách thể loại
  public static getProfile(): Promise<AxiosResponse<IUser>> {
    return axiosInstance.get("/users/profile");
  }
}
