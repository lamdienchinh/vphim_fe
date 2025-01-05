"use client";

import { AuthenApi } from "@/api/authApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetCountries } from "@/hooks/useGetCountries";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthModal } from "../auth/auth-modal";
import ScrollToTopButton from "../button/scroll-to-top";
import SearchMovieCard from "../movie/search-movie-card";

const genres = [
  { slug: "cartoon-movies", name: "Phim hoạt hình" },
  { slug: "single-movies", name: "Phim lẻ" },
  { slug: "series-movies", name: "Phim bộ" },
  { slug: "tv-shows", name: "TV Shows" },
];

export default function Header() {
  const { data: categories } = useGetCategories();
  const { data: countries } = useGetCountries();
  const { data: userProfile, refetch } = useGetUserProfile();
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const currentYear = new Date().getFullYear();
  const startYear = 1983;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (currentYear - i).toString()
  );
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data, isLoading } = useSearchMovies({
    keyword: debouncedQuery,
    page: 1,
    limit: 10,
  });

  const handleLogout = async () => {
    await AuthenApi.logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    document.cookie = "session_vphim=;";
    refetch();
  };

  const imgCDN = data?.data?.APP_DOMAIN_CDN_IMAGE;
  return (
    <>
      <ScrollToTopButton />
      <header
        className={cn(
          `fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-lg:!bg-primary/10 max-sm backdrop-blur-sm !overflow-y-auto`,
          isScrolled && "animate-in slide-in-from-top-0 bg-primary/10"
        )}
      >
        <nav
          className="container flex items-center justify-between py-4 overflow-y-auto"
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
              onClick={() => setMobileMenuOpen((prev) => !prev)}
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
                  className="text-primary hover:text-primary transition-colors duration-200 !bg-transparent"
                >
                  Danh mục
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[40vh]">
                {genres.map((genre) => (
                  <DropdownMenuItem key={genre.slug}>
                    <Link
                      href={`/${genre.slug.toLowerCase().replace(" ", "-")}`}
                    >
                      {genre.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary transition-colors duration-200 !bg-transparent"
                >
                  Thể loại
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid grid-cols-4 gap-2 max-h-[40vh] overflow-y-auto">
                {categories?.map((category) => (
                  <DropdownMenuItem key={category?.slug}>
                    <Link
                      href={`/category/${category.slug
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary transition-colors duration-200 !bg-transparent"
                >
                  Năm
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid grid-cols-5 max-h-[40vh]">
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
                  className="text-primary hover:text-primary transition-colors duration-200 !bg-transparent"
                >
                  Quốc gia
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid grid-cols-4 max-h-[40vh]">
                {countries?.map((country) => (
                  <DropdownMenuItem key={country?._id}>
                    <Link
                      href={`/country/${country?.slug
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {country?.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <DropdownMenu
              open={!!query && !!data?.data?.items?.length}
              modal={false}
            >
              <DropdownMenuTrigger disabled asChild>
                <form className="relative">
                  <Input
                    type="search"
                    placeholder="Tìm kiếm phim..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-64 pr-8 !border-primary rounded-[50px] !text-primary"
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
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto mt-2 max-h-[60vh] overflow-y-auto z-10">
                {!isLoading && data?.data?.items?.length === 0 && (
                  <DropdownMenuItem className="text-center">
                    Không tìm thấy phim nào.
                  </DropdownMenuItem>
                )}
                {data?.data?.items?.map((movie) => (
                  <DropdownMenuItem key={movie._id} asChild>
                    <SearchMovieCard
                      id={movie._id}
                      title={movie.name}
                      poster_url={`${imgCDN}/${movie.poster_url}`}
                      year={movie.year}
                      slug={movie.slug}
                    />
                  </DropdownMenuItem>
                ))}
                {!!data?.data?.items && (
                  <DropdownMenuItem>
                    <Link
                      className="text-center"
                      href={`/search/${encodeURI(query)}`}
                    >
                      Xem thêm kết quả khác
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="ml-4 flex items-center">
            {userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={userProfile.avatar}
                        alt={userProfile.name}
                      />
                      <AvatarFallback>
                        {userProfile.name?.[0] ?? "C"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem disabled>
                    {userProfile.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsOpenAuthModal(true)}>
                Đăng nhập
              </Button>
            )}
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="border-t pb-3 pt-4">
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
                </Button>
              </form>
            </div>
            <div className="space-y-1 px-2 pb-3 pt-2">
              <h2 className="font-semibold">Danh mục</h2>
              {genres.map((genre) => (
                <Link
                  key={genre.slug}
                  href={`/genre/${genre.slug.toLowerCase().replace(" ", "-")}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-100 hover:text-primary transition-colors duration-200"
                >
                  {genre.name}
                </Link>
              ))}
              <h2 className="font-semibold">Thể loại</h2>
              {categories?.map((category) => (
                <Link
                  key={category?.slug}
                  href={`/category/${category?.slug
                    ?.toLowerCase()
                    .replace(" ", "-")}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-100 hover:text-primary transition-colors duration-200"
                >
                  {category?.name}
                </Link>
              ))}
              <h2 className="font-semibold">Năm phát hành</h2>
              {years.map((year) => (
                <Link
                  key={year}
                  href={`/year/${year}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-100 hover:text-primary transition-colors duration-200"
                >
                  {year}
                </Link>
              ))}
              <h2 className="font-semibold">Quốc gia</h2>
              {countries?.map((country) => (
                <Link
                  key={country?.slug}
                  href={`/country/${country.slug
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-100 hover:text-primary transition-colors duration-200"
                >
                  {country?.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      {isOpenAuthModal && (
        <AuthModal isOpen={isOpenAuthModal} setIsOpen={setIsOpenAuthModal} />
      )}
    </>
  );
}
