import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function MovieLayout({
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
