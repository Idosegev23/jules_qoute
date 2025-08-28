import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "הצעת מחיר - פיתוח מערכת הזמנת פגישות | Lion Media",
  description: "הצעת מחיר מותאמת אישית עבור Jules וילונות - מערכת מתקדמת להזמנת פגישות עם אינטגרציה ליומן Google ותזכורות WhatsApp",
  keywords: "הצעת מחיר, מערכת הזמנות, יומן Google, WhatsApp, פגישות, Jules וילונות",
  openGraph: {
    title: "הצעת מחיר - פיתוח מערכת הזמנת פגישות | Lion Media",
    description: "הצעת מחיר מותאמת אישית עבור Jules וילונות - מערכת מתקדמת להזמנת פגישות",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-heebo antialiased`}>
        {children}
      </body>
    </html>
  );
}