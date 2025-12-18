"use client";

import { FundamentalAnalysisSection } from '@/components/FundamentalAnalysisSection';
import { FundamentalEdgeInsight } from '@/components/insights/FundamentalEdgeInsight';
import { FundmentalHeatmap } from '@/components/insights/FundamentalHetmap';
import { CurrencyFundamental } from '@/components/insights/CurrencyFundamental';
import { NewsEvents } from '@/components/insights/NewsEvents';
import { MarketOverviewSection } from '@/components/insights/MarketOverviewSection';
import { TechnicalAnalysisSection } from '@/components/insights/TechnicalAnalysisSection';
import { TechnicalIndicatorsSection } from '@/components/insights/TechnicalIndicatorsSection';
import { EducationSection } from '@/components/education/EducationSection';
import TechnicalHeatmap from '@/components/insights/TechnicalHeatmap';
import { CurrencyStrengthMeter } from '@/components/insights/CurrencyStrengthMeter';
import PageWithHeroLayout from '@/components/layouts/PageWithHeroLayout';
import { HeroSectionContentText } from '@/components/HeroSectionContentText';
import { HeroSectionContentSecondaryText } from '@/components/HeroSectionContentSecondaryText';
import { EducationDTO } from '@/types/results/EducationsIndexResultDTO';

interface HomeClientProps {
    initialEducations: EducationDTO[] | null;
    initialLocale: string;
}

export default function HomeClient({ initialEducations, initialLocale }: HomeClientProps) {
    return (
        <>
            <PageWithHeroLayout alignItems='flex-start'>
                <HeroSectionContentText />
                <HeroSectionContentSecondaryText />
            </PageWithHeroLayout>
            <FundamentalAnalysisSection />
            <FundamentalEdgeInsight />
            <FundmentalHeatmap />
            <CurrencyFundamental />
            <NewsEvents />
            <MarketOverviewSection />
            <TechnicalAnalysisSection />
            <TechnicalIndicatorsSection />
            <EducationSection initialEducations={initialEducations} initialLocale={initialLocale} />
            <TechnicalHeatmap />
            <CurrencyStrengthMeter />
        </>
    )
}