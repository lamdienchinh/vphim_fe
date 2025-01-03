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

type FormData = {
  email: string;
  password: string;
  name?: string;
};

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
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

        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
        setIsOpen(false);
      } else {
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Đăng nhập" : "Đăng ký"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
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
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Mật khẩu là bắt buộc</span>
            )}
          </div>
          <div className="flex w-full">
            <Button disabled={isProcessing} className="w-full" type="submit">
              {isProcessing ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>{isLogin ? "Đăng nhập" : "Đăng ký"}</>
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
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Chưa có tài khoản ? Đăng ký"
            : "Đã có tài khoản ? Đăng nhập"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
