"use client";

import { AuthenApi } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Google from "../icons/google-icon";
import Spinner from "../loading/loader-circle";
import { UserApi } from "@/api/userApi";
import { toast } from "sonner";
import { CountdownTimer } from "../countdown";

type FormData = {
  email: string;
  password: string;
  name?: string;
  otp?: string;
};

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleOAuthSignIn = (provider: string) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API}/auth`;
    window.location.href = `${baseUrl}/${provider}`;
  };

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    try {
      if (isLogin) {
        const body = {
          email: data.email,
          password: data.password,
        };
        const result = await AuthenApi.login(body);
        const { accessToken } = result?.data;
        if (typeof window !== "undefined" && accessToken) {
          localStorage.setItem("token", accessToken);
        }
        setIsOpen(false);
        toast.success("Đăng nhập thành công!");
      } else if (isForgotPassword) {
        if (!otpSent) {
          await AuthenApi.forgotPassword({
            email: data.email,
          });
          setOtpSent(true);
          setShowCountdown(true);
          toast.info("Mã OTP đã được gửi đến email của bạn.");
        } else if (!resetToken) {
          const result = await AuthenApi.verifyOTP({
            email: data.email,
            otp: data.otp!,
          });
          setResetToken(result.data?.accessToken);
          toast.success("Xác thực OTP thành công!");
        } else {
          await UserApi.changePassword({
            password: data.password!,
            accessToken: resetToken,
          });
          setIsOpen(false);
          toast.success("Mật khẩu đã được đặt lại thành công!");
        }
      } else {
        // Handle registration logic here
        toast.success("Đăng ký thành công!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setIsLogin(true);
    setIsForgotPassword(false);
    setOtpSent(false);
    setResetToken(null);
    setShowCountdown(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isLogin
              ? "Đăng nhập"
              : isForgotPassword
              ? "Quên mật khẩu"
              : "Đăng ký"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && !isForgotPassword && (
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input id="name" {...register("name", { required: !isLogin })} />
              {errors.name && (
                <span className="text-red-500">Tên là bắt buộc</span>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email là bắt buộc</span>
            )}
          </div>
          {(!isForgotPassword || (isForgotPassword && resetToken)) && (
            <div className="space-y-2">
              <Label htmlFor="password">
                {resetToken ? "Mật khẩu mới" : "Mật khẩu"}
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: !isForgotPassword || !!resetToken,
                })}
              />
              {errors.password && (
                <span className="text-red-500">Mật khẩu là bắt buộc</span>
              )}
            </div>
          )}
          {isForgotPassword && otpSent && !resetToken && (
            <div className="space-y-2">
              <Label htmlFor="otp">Mã OTP</Label>
              <Input id="otp" {...register("otp", { required: true })} />
              {errors.otp && (
                <span className="text-red-500">Mã OTP là bắt buộc</span>
              )}
              {showCountdown && (
                <CountdownTimer
                  initialTime={300}
                  onComplete={() => {
                    setShowCountdown(false);
                    toast.warning(
                      "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới."
                    );
                  }}
                />
              )}
            </div>
          )}
          <div className="flex w-full">
            <Button disabled={isProcessing} className="w-full" type="submit">
              {isProcessing ? (
                <Spinner />
              ) : (
                <>
                  {isLogin
                    ? "Đăng nhập"
                    : isForgotPassword
                    ? otpSent
                      ? resetToken
                        ? "Đặt lại mật khẩu"
                        : "Xác thực OTP"
                      : "Gửi OTP"
                    : "Đăng ký"}
                </>
              )}
            </Button>
          </div>
        </form>
        {isLogin && (
          <div className="flex flex-col space-y-2 mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isProcessing}
              onClick={() => handleOAuthSignIn("google")}
            >
              <Google />
              Đăng nhập với Google
            </Button>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Button
            variant="link"
            onClick={() => {
              if (isForgotPassword) {
                resetForm();
              } else {
                setIsLogin(!isLogin);
                setIsForgotPassword(false);
              }
            }}
          >
            {isForgotPassword
              ? "Quay lại đăng nhập"
              : isLogin
              ? "Chưa có tài khoản ? Đăng ký"
              : "Đã có tài khoản ? Đăng nhập"}
          </Button>
          {isLogin && (
            <Button
              variant="link"
              onClick={() => {
                setIsForgotPassword(true);
                setIsLogin(false);
              }}
            >
              Quên mật khẩu?
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
