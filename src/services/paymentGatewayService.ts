import { API_ENDPOINTS, axiosInstance } from "@/lib/config";

export interface PaymentGateway {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
    icon: string | null;
    settings?: any;
}

export interface PaymentGatewayResponse {
    success: boolean;
    message: string;
    data: PaymentGateway[];
}

class PaymentGatewayService {
    private url: string;

    constructor() {
        this.url = `${API_ENDPOINTS.PACKAGES.replace('/packages', '')}/payment-gateways`;
    }

    async getActiveGateways(): Promise<PaymentGateway[]> {
        try {
            const response = await axiosInstance.get(`${this.url}/active`);
            const result: PaymentGatewayResponse = response.data;
            return result.data || [];
        } catch (error) {
            console.error('PaymentGatewayService.getActiveGateways error:', error);
            return [];
        }
    }
}

export const paymentGatewayService = new PaymentGatewayService();

