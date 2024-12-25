import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function SearchLayout({
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
