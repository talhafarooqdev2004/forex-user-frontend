import {
    API_ENDPOINTS
} from "@/lib/config";
import {
    PageContentDTO
} from "@/types/results/PageContentIndexResultDTO";

class PageContentService {
    async getPageContent(pageIdentifier: string, locale: string): Promise < PageContentDTO[] > {
        const response = await fetch(`${API_ENDPOINTS.PAGE_CONTENTS}/${pageIdentifier}?locale=${locale}`, {
            next: { 
                revalidate: 3600
            },
            headers: {
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch page content');
        }
        const result = await response.json();
        return result.data;
    }
}

export const pageContentService = new PageContentService();
