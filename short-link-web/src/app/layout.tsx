import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/Menu";

export const metadata: Metadata = {
  title: "Shorten Client",
  description: "Shorten Client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='flex flex-col justify-center items-center py-4'
      >
        <Menu />
        {children}
      </body>
    </html>
  );
}
