import { ResponseDTO } from "./responseDTO";

export interface PostTranslationDTO {
    title: string;
    content: string;
}

export interface PostDTO {
    id: number;
    bannerImg: string | null;
    topic: string | null;
    slug: string;
    translation: PostTranslationDTO;
    createdAt: string;
}

export interface PostsIndexResultDTO extends ResponseDTO {
    data: PostDTO[]
}