import { API_ENDPOINTS } from "@/lib/config";
import { TopicsIndexResultDTO } from "@/types/results";
import { TopicDTO } from "@/types/results/TopicsIndexResultDTO";

class TopicService {
    private url: string;

    constructor() {
        this.url = API_ENDPOINTS.FORUM.TOPIC;
    }

    getTopics = async (locale: string = ''): Promise<TopicDTO[] | []> => {
        try {
            const response = await fetch(`${this.url}?locale=${locale}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 3600
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch topics: ${response.statusText}`);
            }

            const result: TopicsIndexResultDTO = await response.json();

            return result?.data || [];
        } catch (error) {
            console.error('TackageService.getTopicWithPostIDs error:', error);
            return [];
        }
    }
}

export const topicService = new TopicService();