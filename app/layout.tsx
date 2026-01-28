import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KickstartKorean",
  description: "Learn Korean effectively",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || "en";

  return (
    <html lang={locale}>
      <body className="antialiased">
        {props.children}
      </body>
    </html>
  );
}