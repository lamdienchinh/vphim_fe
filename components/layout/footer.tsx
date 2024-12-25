import Link from "next/link";
import { Facebook, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-6 py-6 container">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Giới thiệu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Về Vphim</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vphim - Thiên đường giải trí trực tuyến của bạn! Khám phá vô vàn
              bộ phim đặc sắc từ blockbuster Hollywood đến những kiệt tác điện
              ảnh Việt Nam và quốc tế. Trải nghiệm xem phim mượt mà, chất lượng
              cao và hoàn toàn miễn phí!
            </p>
          </div>

          {/* Thông tin pháp lý */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lưu ý quan trọng</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vphim tổng hợp nội dung từ các nguồn chia sẻ video trên
              Internet. Chúng tôi không lưu trữ hay phát trực tiếp nội dung vi
              phạm bản quyền. Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ
              với chúng tôi để được giải đáp.
            </p>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kết nối với chinhld</h3>
            <div className="flex gap-4">
              <Link
                href="https://github.com/chinhld"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">Github của chinhld</span>
              </Link>
              <Link
                href="https://facebook.com/chinhld"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook của chinhld</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Vphim - Sáng tạo bởi chinhld với ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
