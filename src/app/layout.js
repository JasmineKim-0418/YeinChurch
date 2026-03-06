import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupWrapper from "@/components/PopupWrapper";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationObserver from "@/components/ScrollAnimationObserver";
import ScrollReset from "@/components/ScrollReset";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "예인교회 - 하나님의 사랑으로 세상을 품는 교회",
  description: "예인교회에 오신 것을 환영합니다. 함께 예배하고, 함께 성장하며, 함께 섬기는 공동체입니다.",
  keywords: "구리 교회, 구리시 교회, 교문동 교회, 구리 예인교회, 말씀중심교회, 구리 교회 추천, 구리시 교회 추천, 예인교회, 예배, 설교, 기독교, 경기도 구리 교회",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${notoSerifKR.variable}`}>
        <Header />
        <main style={{ paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollAnimationObserver />
        <ScrollReset />
        <PopupWrapper />
      </body>
    </html>
  );
}

