import useSWR, { SWRConfiguration } from "swr";
import { packageService } from "@/services/packageService";
import { API_ENDPOINTS } from "@/lib/config";
import { PackageDTO } from "@/types/results/PackagesIndexResultDTO";

interface UsePackagesOptions extends SWRConfiguration {
    fallbackData?: PackageDTO[];
    locale?: string;
}

export function usePackages(options?: UsePackagesOptions) {
    const { locale = 'en', fallbackData, ...swrOptions } = options || {};

    const { data, error, isLoading, mutate } = useSWR<PackageDTO[]>(
        `${API_ENDPOINTS.PACKAGES}?locale=${locale}`,
        () => packageService.getPackages(locale),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 5000,
            fallbackData,
            ...swrOptions,
        }
    );

    return {
        packages: data,
        isLoading,
        isError: error,
        mutate,
        refresh: () => mutate(),
    };
}