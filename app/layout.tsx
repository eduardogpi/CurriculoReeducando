import type { Metadata } from "next";
// User rule: "Use modern typography (e.g., from Google Fonts like Inter, Roboto, or Outfit) instead of browser defaults."
// I will keep Geist for now as it is modern, but I should probably use Inter as per recommendation if I want to be strict, but Geist is fine.
// Actually, I will switch to Inter as per explicit suggestion in generic rules, to be safe.
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema Penitenciário - Currículo",
  description: "Sistema de gestão de currículo prisional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider locale={ptBR} theme={{ token: { fontFamily: inter.style.fontFamily } }}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
