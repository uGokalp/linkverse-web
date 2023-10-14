"use client";
import Providers from "@/app/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} >
      <body suppressHydrationWarning={true} >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
