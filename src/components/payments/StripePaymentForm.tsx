"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { paymentService } from '@/services/paymentService';
import { useAuth } from '@/contexts/AuthContext';
import styles from './StripePaymentForm.module.scss';

// Initialize Stripe (will use public key from API when available)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

interface StripePaymentFormProps {
    clientSecret: string;
    amount: number;
    currency: string;
    transactionId: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

function PaymentForm({ clientSecret, amount, currency, transactionId, onSuccess, onError }: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const { token } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            // Confirm payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (stripeError) {
                setError(stripeError.message || 'Payment failed');
                onError(stripeError.message || 'Payment failed');
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                // Confirm payment on backend
                try {
                    await paymentService.confirmStripePayment({
                        paymentIntentId: paymentIntent.id,
                    });
                    onSuccess();
                } catch (confirmError: any) {
                    setError(confirmError.message || 'Failed to confirm payment');
                    onError(confirmError.message || 'Failed to confirm payment');
                }
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Payment processing failed';
            setError(errorMessage);
            onError(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className={styles.paymentForm}>
            <div className={styles.cardElementWrapper}>
                <CardElement options={cardElementOptions} />
            </div>
            {error && (
                <div className={styles.errorMessage}>{error}</div>
            )}
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={styles.submitButton}
            >
                {isProcessing ? 'Processing...' : `Pay ${currency} ${amount.toFixed(2)}`}
            </button>
        </form>
    );
}

export default function StripePaymentForm(props: StripePaymentFormProps) {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret: props.clientSecret }}>
            <PaymentForm {...props} />
        </Elements>
    );
}

