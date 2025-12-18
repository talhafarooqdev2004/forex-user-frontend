import { ResponseDTO } from "./responseDTO";

export interface EducationTranslationDTO {
    title: string;
    content: string;
}

export interface EducationDTO {
    id: number;
    slug: string;
    translation: EducationTranslationDTO;
}

export interface EducationsIndexResultDTO extends ResponseDTO {
    data: EducationDTO[];
}