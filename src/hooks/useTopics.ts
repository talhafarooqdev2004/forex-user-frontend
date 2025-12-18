import { API_ENDPOINTS } from "@/lib/config";
import { topicService } from "@/services/Forum/topicService";
import { TopicDTO } from "@/types/results/TopicsIndexResultDTO";
import useSWR, { SWRConfiguration } from "swr";

interface UseTopicsOptions extends SWRConfiguration {
    fallbackData?: TopicDTO[];
    locale?: string;
}

export default function useTopics(options?: UseTopicsOptions) {
    const { locale = 'en', fallbackData = [], ...swrOptions } = options || {};

    const { data, error, isLoading, mutate } = useSWR(
        `${API_ENDPOINTS.FORUM.TOPIC}?locale=${locale}`,
        () => topicService.getTopics(locale),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 5000,
            fallbackData,
            ...swrOptions,
        }
    );

    return {
        topics: data,
        isLoading,
        isError: error,
        mutate,
        refresh: () => mutate(),
    };
}