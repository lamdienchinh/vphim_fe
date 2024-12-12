"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = ["Phim mới", "Phim lẻ", "Phim bộ", "Phim chiếu rạp"];
const genres = [
  "Hành động",
  "Tình cảm",
  "Hài hước",
  "Kinh dị",
  "Khoa học viễn tưởng",
];
const years = ["2023", "2022", "2021", "2020", "Trước 2020"];
const countries = ["Việt Nam", "Mỹ", "Hàn Quốc", "Trung Quốc", "Nhật Bản"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-sm animate-in slide-in-from-top-0 bg-white/20"
          : ""
      }`}
    >
      <nav
        className="container flex items-center justify-between py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Vphim</span>
            <span className="text-2xl font-bold text-primary uppercase">
              Vphim
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-primary transition-colors duration-200 !bg-transparent"
              >
                Danh mục
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category}>
                  <Link
                    href={`/category/${category
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {category}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-primary transition-colors duration-200 !bg-transparent"
              >
                Thể loại
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {genres.map((genre) => (
                <DropdownMenuItem key={genre}>
                  <Link
                    href={`/genre/${genre.toLowerCase().replace(" ", "-")}`}
                  >
                    {genre}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-primary transition-colors duration-200 !bg-transparent"
              >
                Năm
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {years.map((year) => (
                <DropdownMenuItem key={year}>
                  <Link href={`/year/${year}`}>{year}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:text-primary transition-colors duration-200 !bg-transparent"
              >
                Quốc gia
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {countries.map((country) => (
                <DropdownMenuItem key={country}>
                  <Link
                    href={`/country/${country.toLowerCase().replace(" ", "-")}`}
                  >
                    {country}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <form className="relative">
            <Input
              type="search"
              placeholder="Tìm kiếm phim..."
              className="w-64 pr-8 border-white rounded-[50px] !text-white"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 hover:bg-gray-100 transition-colors duration-200"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-primary transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
            {genres.map((genre) => (
              <Link
                key={genre}
                href={`/genre/${genre.toLowerCase().replace(" ", "-")}`}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-primary transition-colors duration-200"
              >
                {genre}
              </Link>
            ))}
            {years.map((year) => (
              <Link
                key={year}
                href={`/year/${year}`}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-primary transition-colors duration-200"
              >
                {year}
              </Link>
            ))}
            {countries.map((country) => (
              <Link
                key={country}
                href={`/country/${country.toLowerCase().replace(" ", "-")}`}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-primary transition-colors duration-200"
              >
                {country}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <form className="relative mx-3 mt-3">
              <Input
                type="search"
                placeholder="Tìm kiếm phim..."
                className="w-full pr-8"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 hover:bg-gray-100 transition-colors duration-200"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
