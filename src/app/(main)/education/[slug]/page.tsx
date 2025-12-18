import { cookies } from 'next/headers';
import EducationClient from './EducationClient';
import { educationService } from '@/services/educationService';

export default async function EducationPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

    const education = await educationService.getEducationBySlug(slug, locale);

    if (!education) {
        throw new Error('Education Not Found!');
    }

    return <EducationClient initialEducation={education} slug={slug} initialLocale={locale} />;
}

