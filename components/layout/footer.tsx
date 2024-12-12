import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-6">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="https://facebook.com"
            className="text-gray-400 hover:text-white"
          >
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </Link>
          <Link
            href="https://twitter.com"
            className="text-gray-400 hover:text-white"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
          <Link
            href="https://instagram.com"
            className="text-gray-400 hover:text-white"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://youtube.com"
            className="text-gray-400 hover:text-white"
          >
            <span className="sr-only">YouTube</span>
            <Youtube className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <Link
                href="/about"
                className="text-sm leading-6 text-gray-600 hover:text-gray-400"
              >
                Giới thiệu
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                href="/terms"
                className="text-sm leading-6 text-gray-600 hover:text-gray-400"
              >
                Điều khoản sử dụng
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                href="/privacy"
                className="text-sm leading-6 text-gray-600 hover:text-gray-400"
              >
                Chính sách bảo mật
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                href="/contact"
                className="text-sm leading-6 text-gray-600 hover:text-gray-400"
              >
                Liên hệ
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-sm leading-5 text-gray-600">
            &copy; {new Date().getFullYear()} Vphim. Tất cả các quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
