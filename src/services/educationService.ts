import { API_ENDPOINTS } from "@/lib/config";
import { EducationDTO, EducationsIndexResultDTO } from "@/types/results/EducationsIndexResultDTO";

class EducationService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_ENDPOINTS.EDUCATION;
    }

    getEducations = async (locale?: string): Promise<EducationDTO[] | null> => {
        try {
            const currentLocale = locale || process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en";
            
            const response = await fetch(`${this.baseUrl}?locale=${currentLocale}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 3600
                }
            });

            if (!response.ok) {
                console.error(`Failed to fetch educations: ${response.status} ${response.statusText}`);
                return null;
            }

            const result: EducationsIndexResultDTO = await response.json();
            return result.data || null;
        } catch (error) {
            console.error('Error fetching educations:', error);
            return null;
        }
    }

    getEducationBySlug = async (slug: string, locale?: string): Promise<EducationDTO | null> => {
        try {
            if (!slug) {
                throw new Error('Slug is required!');
            }

            const currentLocale = locale || process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en";
            const params = new URLSearchParams();
            params.append('locale', currentLocale);
            params.append('slug', slug);

            const getUrl = `${this.baseUrl}/get?${params.toString()}`;

            const response = await fetch(getUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 3600
                }
            });

            if (!response.ok) {
                console.error(`Failed to fetch education: ${response.status} ${response.statusText}`);
                return null;
            }

            const result = await response.json();
            return result?.data as EducationDTO || null;
        } catch (error) {
            console.error('Error fetching education:', error);
            return null;
        }
    }
}

export const educationService = new EducationService();