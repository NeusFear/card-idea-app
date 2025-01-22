import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Card Game Cards",
  description: "An app to generate card ideas for a card game by Brandon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased m-0 p-0" >
        {children}
      </body>
    </html>
  );
}
