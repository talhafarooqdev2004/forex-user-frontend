"use client";

import SingleEducationCard from './SingleEducationCard';
import { EducationDTO } from '@/types/results/EducationsIndexResultDTO';
import useEducation from '@/hooks/useEducation';
import { useLanguage } from '../LanguageProvider';

type SingleEducationLayoutProps = {
    initialEducation: EducationDTO;
    slug: string;
    initialLocale: string;
}

export default function SingleEducationLayout({ initialEducation, slug, initialLocale }: SingleEducationLayoutProps) {
    const { currentLanguage } = useLanguage();

    const { education } = useEducation({
        fallbackData: initialEducation,
        locale: currentLanguage || initialLocale,
        slug: slug,
    });

    return (
        <>
            <SingleEducationCard education={education || initialEducation} />
        </>
    );
}

