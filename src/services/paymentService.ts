import { API_ENDPOINTS, axiosInstance } from "@/lib/config";

export interface CreatePaymentIntentRequest {
    packageId: number;
    amount: number;
    currency?: string;
}

export interface CreatePaymentIntentResponse {
    success: boolean;
    message: string;
    data: {
        clientSecret?: string;
        orderId?: string;
        requestId?: string;
        gateway: string;
        amount: number;
        currency: string;
        redirectUrl?: string;
    };
}

class PaymentService {
    private url: string;

    constructor() {
        // Use PAYMENTS endpoint directly from config
        this.url = API_ENDPOINTS.PAYMENTS;
    }

    async createStripeIntent(data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> {
        try {
            const response = await axiosInstance.post(`${this.url}/stripe/create-intent`, data);
            return response.data;
        } catch (error: any) {
            console.error('PaymentService.createStripeIntent error:', error);
            throw new Error(error.response?.data?.message || 'Failed to create payment intent');
        }
    }

    async createPayPalOrder(data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> {
        try {
            const response = await axiosInstance.post(`${this.url}/paypal/create-order`, data);
            return response.data;
        } catch (error: any) {
            console.error('PaymentService.createPayPalOrder error:', error);
            throw new Error(error.response?.data?.message || 'Failed to create PayPal order');
        }
    }

    async createJazzCashRequest(data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> {
        try {
            const response = await axiosInstance.post(`${this.url}/jazzcash/create-request`, data);
            return response.data;
        } catch (error: any) {
            console.error('PaymentService.createJazzCashRequest error:', error);
            throw new Error(error.response?.data?.message || 'Failed to create JazzCash request');
        }
    }

    async confirmStripePayment(data: { paymentIntentId: string }): Promise<any> {
        try {
            const response = await axiosInstance.post(`${this.url}/stripe/confirm`, data);
            return response.data;
        } catch (error: any) {
            console.error('PaymentService.confirmStripePayment error:', error);
            throw new Error(error.response?.data?.message || 'Failed to confirm payment');
        }
    }
}

export const paymentService = new PaymentService();

