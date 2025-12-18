import { ResponseDTO } from "./responseDTO";

export interface PackageTranslationDTO {
    name: string;
    detail: string;
}

export interface PackageDTO {
    id: number;
    price: number;
    durationHours: number;
    freeTrialHours: number;
    translation: PackageTranslationDTO
}

export interface PackagesIndexResultDTO extends ResponseDTO {
    data: PackageDTO[]
}