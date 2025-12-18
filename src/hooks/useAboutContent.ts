import {
    API_ENDPOINTS
} from "@/lib/config";
import {
    pageContentService
} from "@/services/pageContentService";
import {
    PageContentDTO
} from "@/types/results/PageContentIndexResultDTO";
import useSWR, {
    SWRConfiguration
} from "swr";

interface UseAboutContentProps extends SWRConfiguration {
    fallbackData ? : PageContentDTO[] | undefined;
    locale ? : string;
}

export default function useAboutContent(options ? : UseAboutContentProps) {
    const {
        locale = 'en', fallbackData, ...swrOptions
    } = options || {};

    const {
        data,
        isLoading,
        error,
        mutate,
    } = useSWR(
        `${API_ENDPOINTS.PAGE_CONTENTS}/about_us?locale=${locale}`,
        () => pageContentService.getPageContent('about_us', locale), {
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
        aboutContent: data ?? [],
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
}
