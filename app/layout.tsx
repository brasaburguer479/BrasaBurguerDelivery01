import type {Metadata} from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Brasa Burguer Delivery - O Sabor do Fogo de Verdade',
  description: 'Faça seu pedido de forma rápida e prática. Hambúrgueres artesanais grelhados na brasa com ingredientes selecionados.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#FDFBF7] text-[#4A3728] min-h-screen selection:bg-[#8B4513] selection:text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
