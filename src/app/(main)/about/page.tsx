import AboutClient from './AboutClient';
import {
    cookies
} from 'next/headers';
import {
    pageContentService
} from '@/services/pageContentService';

export default async function About() {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || 'en';

    const aboutContent = await pageContentService.getPageContent('about_us', locale);

    return (
        <AboutClient initialData={aboutContent} initialLocale={locale} />
    );
} 