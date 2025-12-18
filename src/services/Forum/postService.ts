import { API_ENDPOINTS } from "@/lib/config";
import { PostDTO, PostsIndexResultDTO } from "@/types/results/PostsIndexResultDTO";

export default class PostService {
    private readonly baseUrl: string;
    private readonly getUrl: string;

    constructor() {
        this.baseUrl = API_ENDPOINTS.FORUM.POSTS;
        this.getUrl = `${this.baseUrl}/get`;
    }

    async getPostsByTopicId(topicId: number, locale = ''): Promise<PostDTO[]> {
        try {
            const params = new URLSearchParams();

            if (locale) params.append('locale', locale);
            if (topicId) params.append('topicId', String(topicId));

            const finalUrl = `${this.baseUrl}?${params.toString()}`;

            const response = await fetch(finalUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.error(`Failed to fetch posts: ${response.status}`);
                return [];
            }

            const result: PostsIndexResultDTO = await response.json();
            return result?.data || [];
        } catch (error) {
            console.error('PostService.getPostsByTopicId() error:', error);
            return [];
        }
    }

    async getPostBySlug(slug: string, locale = ''): Promise<PostDTO | null> {
        try {
            if (!slug) {
                throw new Error('Slug is required!');
            }

            const params = new URLSearchParams();
            if (locale) params.append('locale', locale);
            params.append('slug', slug);

            const finalUrl = `${this.getUrl}?${params.toString()}`;

            const response = await fetch(finalUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                next: {
                    revalidate: 3600
                }
            });

            if (!response.ok) {
                console.error(`Failed to fetch post: ${response.status}`);
                return null;
            }

            const result = await response.json();
            return result?.data as PostDTO;
        } catch (error) {
            console.error('PostService.getPostBySlug() error:', error);
            return null;
        }
    }
}

export const postService = new PostService();
