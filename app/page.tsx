import { EnhancedSky } from "@/components/enhanced-sky";
import Header from "../components/header";
import MainContent from "@/components/main";
import { Noto_Sans_JP, Rock_3D } from 'next/font/google';
import Head from 'next/head';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '400', '900'], // Adapte aos pesos que você precisa
});

const rock3D = Rock_3D({
  subsets: ['latin'],
  weight: ['400'], // Rock 3D só tem peso regular (400)
});

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rock+3D&display=swap" rel="stylesheet" />
      </Head>
      <EnhancedSky  />
      <Header />
    
    </div>
  );
}