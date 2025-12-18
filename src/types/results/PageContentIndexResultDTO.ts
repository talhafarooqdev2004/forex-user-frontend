export interface PageContentTranslationDTO {
    id: number;
    locale: string;
    contentValue: string;
}

export interface PageContentDTO {
    id: number;
    sectionKey: string;
    translations: PageContentTranslationDTO;
}
