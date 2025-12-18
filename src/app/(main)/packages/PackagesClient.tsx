"use client";

import PageWithHeroLayout from "@/components/layouts/PageWithHeroLayout";
import PackagesCard from "@/components/packages/PackagesCard";
import PackagesCardsLayout from "@/components/packages/PackagesCardsLayout";
import { usePackages } from "@/hooks/usePackages";
import { useLanguage } from "@/components/LanguageProvider";
import { PackageDTO } from "@/types/results/PackagesIndexResultDTO";

interface Props {
    initialData: PackageDTO[];
    initialLocale: string;
}

export function PackagesClient({ initialData, initialLocale }: Props) {
    const { currentLanguage } = useLanguage();

    const { packages } = usePackages({
        fallbackData: initialData,
        locale: currentLanguage || initialLocale,
    });

    return (
        <PageWithHeroLayout>
            <PackagesCardsLayout>
                {packages?.map((pkg) => (
                    <PackagesCard key={pkg.id} {...pkg} />
                ))}
            </PackagesCardsLayout>
        </PageWithHeroLayout>
    );
}