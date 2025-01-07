import axiosInstance from "@/config/axiosV2";
import { IChangePasswordDTO } from "@/types/auth";
import { IUser } from "@/types/user";
import { AxiosResponse } from "axios";

export class UserApi {
  // Danh sách thể loại
  public static getProfile(): Promise<AxiosResponse<IUser>> {
    return axiosInstance.get("/users/profile");
  }
  public static changePassword(body: IChangePasswordDTO) {
    const token = body.accessToken;
    if (!token) {
      return axiosInstance.post("/users/change-password", {
        password: body.password,
      });
    }

    return axiosInstance.post(
      "/users/change-password",
      { password: body.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
