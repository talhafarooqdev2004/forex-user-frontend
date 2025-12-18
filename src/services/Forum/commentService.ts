import { axiosInstance } from '@/lib/config';
import { API_ENDPOINTS } from '@/lib/config';

export interface CommentDTO {
    id: number;
    postId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export interface CommentResponseDTO {
    success: boolean;
    message: string;
    data: CommentDTO[];
}

export interface CommentCountResponseDTO {
    success: boolean;
    message: string;
    data: {
        count: number;
    };
}

class CommentService {
    async getCommentsByPostId(postId: number): Promise<CommentDTO[]> {
        try {
            const response = await axiosInstance.get<CommentResponseDTO>(
                `${API_ENDPOINTS.FORUM.COMMENTS}/post/${postId}`
            );
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    }

    async getCommentCount(postId: number): Promise<number> {
        try {
            const response = await axiosInstance.get<CommentCountResponseDTO>(
                `${API_ENDPOINTS.FORUM.COMMENTS}/post/${postId}/count`
            );
            return response.data.data?.count || 0;
        } catch (error) {
            console.error('Error fetching comment count:', error);
            return 0;
        }
    }

    async createComment(postId: number, content: string): Promise<CommentDTO> {
        const response = await axiosInstance.post<{
            success: boolean;
            message: string;
            data: CommentDTO;
        }>(API_ENDPOINTS.FORUM.COMMENTS, {
            postId,
            content
        });
        return response.data.data;
    }
}

export const commentService = new CommentService();

