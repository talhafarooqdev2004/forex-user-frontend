"use client";

import useSWR from 'swr';
import { packageService } from '@/services/packageService';
import { API_ENDPOINTS } from '@/lib/config';
import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';
import { useLanguage } from '@/components/LanguageProvider';

interface UseSubscriptionPlansOptions {
    fallbackData?: PackageDTO[];
}

export function useSubscriptionPlans(options?: UseSubscriptionPlansOptions) {
    const { fallbackData } = options || {};
    const { currentLanguage } = useLanguage();
    const locale = currentLanguage || 'en';

    const { data, error, isLoading } = useSWR<PackageDTO[]>(
        `${API_ENDPOINTS.PACKAGES}?locale=${locale}`,
        () => packageService.getPackages(locale),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 5000,
            fallbackData,
        }
    );

    return { subscriptionPlans: data, loading: isLoading, isError: error };
} 