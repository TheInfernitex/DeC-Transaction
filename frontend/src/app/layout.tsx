import type { Metadata } from "next";
import "./globals.css";
import ClientThirdwebProvider from "@/components/ClientThirdWebProvider";


export const metadata: Metadata = {
  title: "Blockchain App",
  description: "Developed by Parth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ClientThirdwebProvider>
          {children}
        </ClientThirdwebProvider>
      </body>
    </html>
  );
}
