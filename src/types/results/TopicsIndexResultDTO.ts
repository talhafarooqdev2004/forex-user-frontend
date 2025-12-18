import { ResponseDTO } from "./responseDTO";

export interface TopicTranslationDTO {
    title: string;
}

export interface TopicDTO {
    id: number;
    translation: TopicTranslationDTO;
    postIds: number[];
}

export interface TopicsIndexResultDTO extends ResponseDTO {
    data: TopicDTO[]
}