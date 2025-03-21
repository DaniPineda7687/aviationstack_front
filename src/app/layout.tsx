import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AviationStack Frontend",
  description: "Consulta de aeropuertos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.className} `}
      >
        <div
          className="absolute inset-0 -z-10 bg-[url('/background_app.webp')] bg-cover bg-center brightness-25"
        />
        <div className="absolute inset-0 -z-5 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(0,15,55,0)_40%,_rgba(0,15,55,0.85)_100%)]" />
        <div className="pb-16 sm:pb-4 h-[100vh] overflow-y-auto ">
        {children}

        </div>
        
      </body>
    </html>
  );
}