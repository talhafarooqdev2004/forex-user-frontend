import { API_ENDPOINTS } from "@/lib/config";
import { educationService } from "@/services/educationService";
import { EducationDTO } from "@/types/results/EducationsIndexResultDTO";
import useSWR, { SWRConfiguration } from "swr";

interface UseEducationsProps extends SWRConfiguration {
    fallbackData?: EducationDTO[] | null;
    locale?: string;
}

export default function useEducations(options?: UseEducationsProps) {
    const { locale = 'en', fallbackData, ...swrOptions } = options || {};

    const {
        data,
        isLoading,
        error,
        mutate,
    } = useSWR(
        `${API_ENDPOINTS.EDUCATION}?locale=${locale}`,
        () => educationService.getEducations(locale),
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
        educations: data ?? [],
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
}