import { API_ENDPOINTS } from "@/lib/config";
import { postService } from "@/services/Forum/postService";
import { PostDTO } from "@/types/results/PostsIndexResultDTO";
import useSWR, { SWRConfiguration } from "swr";

interface UsePostsOptions extends SWRConfiguration {
    fallbackData?: PostDTO[];
    topicId: number;
    locale?: string;
}

export default function usePosts(options?: UsePostsOptions) {
    const { locale = 'en', topicId = 0, fallbackData, ...swrOptions } = options || {};

    const { data, isLoading, error } = useSWR<PostDTO[] | []>(
        `${API_ENDPOINTS.FORUM.POSTS}?locale=${locale}?topicId=${topicId}`,
        () => postService.getPostsByTopicId(topicId, locale),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 5000,
            fallbackData,
            ...swrOptions,
        });

    return {
        posts: data,
        isLoading: isLoading,
        isError: error,
    }
}
