import { API_ENDPOINTS } from "@/lib/config";
import { educationService } from "@/services/educationService";
import { EducationDTO } from "@/types/results/EducationsIndexResultDTO";
import useSWR, { SWRConfiguration } from "swr";

interface UseEducationProps extends SWRConfiguration {
    fallbackData?: EducationDTO | null;
    locale?: string;
    slug: string;
}

export default function useEducation(options?: UseEducationProps) {
    const { locale = 'en', slug = '', fallbackData, ...swrOptions } = options || {};

    const {
        data,
        isLoading,
        error,
        mutate,
    } = useSWR(
        slug ? `${API_ENDPOINTS.EDUCATION}/get?locale=${locale}&slug=${slug}` : null,
        () => educationService.getEducationBySlug(slug, locale),
        {
            fallbackData,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshInterval: 0,
            dedupingInterval: 60000,
            keepPreviousData: true,
            ...swrOptions,
        }
    )

    return {
        education: data ?? null,
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
}

