import { LanguageProvider } from '@/components/LanguageProvider';
import { IntlProvider } from '@/components/IntlProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModalProvider } from '@/contexts/AuthModalContext';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getLocaleFromCookie } from '@/i18n/config';
import Layout from '@/components/Layout';
import { Inter, Poppins } from "next/font/google";

export const metadata: Metadata = {
    title: "Forex Trading Platform",
    description: "Advanced forex trading platform with real-time market data and professional tools",
    keywords: "forex, trading, currency, market, investment",
    authors: [{ name: "Forex Trading Team" }],
    robots: "index, follow"
};

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900']
});

const fonts = { inter, poppins };

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({
    children,
}: RootLayoutProps) {
    const cookieStore = await cookies();
    const locale = getLocaleFromCookie(cookieStore.get('locale')?.value);

    return (
        <Layout locale={locale} fonts={fonts}>
            <AuthProvider>
                <AuthModalProvider>
                    <LanguageProvider>
                        <IntlProvider initialLocale={locale}>
                            {children}
                        </IntlProvider>
                    </LanguageProvider>
                </AuthModalProvider>
            </AuthProvider>
        </Layout>
    );
} 