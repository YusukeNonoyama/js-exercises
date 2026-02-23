import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saitama Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-100 flex flex-col items-center p-5">
        {children}
      </body>
    </html>
  );
}
