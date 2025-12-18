import { API_ENDPOINTS, axiosInstance } from "@/lib/config";
import { PackagesIndexResultDTO } from "@/types/results";
import { PackageDTO } from "@/types/results/PackagesIndexResultDTO";

class PackageService {
    private url: string;

    constructor() {
        this.url = API_ENDPOINTS.PACKAGES;
    }

    async getPackages(locale: string = 'en'): Promise<PackageDTO[]> {
        try {
            // Check if we're on the client side (browser)
            const isClient = typeof window !== 'undefined';
            
            if (isClient) {
                // Use axiosInstance for client-side calls (better error handling and CORS)
                const response = await axiosInstance.get(`${this.url}?locale=${locale}`);
                const result: PackagesIndexResultDTO = response.data;
                return result.data || [];
            } else {
                // Use fetch for server-side calls (Next.js server components)
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
                    throw new Error(`Failed to fetch packages: ${response.statusText}`);
                }

                const result: PackagesIndexResultDTO = await response.json();
                return result.data || [];
            }
        } catch (error) {
            console.error('PackageService.getPackages error:', error);
            return [];
        }
    }

    async getPackageById(id: number, locale: string = 'en'): Promise<PackageDTO | null> {
        try {
            const isClient = typeof window !== 'undefined';
            
            if (isClient) {
                const response = await axiosInstance.get(`${this.url}/${id}?locale=${locale}`);
                const result = response.data;
                return result.data;
            } else {
                const response = await fetch(`${this.url}/${id}?locale=${locale}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch package: ${response.statusText}`);
                }

                const result = await response.json();
                return result.data;
            }
        } catch (error) {
            console.error('PackageService.getPackageById error:', error);
            return null;
        }
    }
}

export const packageService = new PackageService();