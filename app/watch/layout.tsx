import Footer from "@/components/layout/footer";
import Header from "@/components/layout/normal-header";

export default function WatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
