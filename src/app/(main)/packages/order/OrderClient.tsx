"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';
import { paymentGatewayService, PaymentGateway } from '@/services/paymentGatewayService';
import { paymentService } from '@/services/paymentService';
import { useAuth } from '@/contexts/AuthContext';
import PageWithHeroLayout from '@/components/layouts/PageWithHeroLayout';
import StripePaymentForm from '@/components/payments/StripePaymentForm';
import styles from './OrderClient.module.scss';

interface OrderClientProps {
    packageData: PackageDTO;
    selectedGateway: string;
    initialLocale: string;
}

export default function OrderClient({ packageData, selectedGateway, initialLocale }: OrderClientProps) {
    const t = useTranslations('package');
    const router = useRouter();
    const { user } = useAuth();
    const [gateway, setGateway] = useState<PaymentGateway | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<number | null>(null);
    const [jazzcashFormData, setJazzcashFormData] = useState<any>(null);

    useEffect(() => {
        if (!user) {
            router.push('/packages');
            return;
        }

        fetchGateway();
    }, [selectedGateway, user]);

    const fetchGateway = async () => {
        if (!selectedGateway) return;

        try {
            const gateways = await paymentGatewayService.getActiveGateways();
            const foundGateway = gateways.find(g => g.name === selectedGateway);
            if (foundGateway) {
                setGateway(foundGateway);
            }
        } catch (error) {
            console.error('Failed to fetch gateway:', error);
        }
    };

    const durationDays = Math.floor(packageData.durationHours / 24);
    const freeTrialDays = Math.floor(packageData.freeTrialHours / 24);
    const planType = packageData.translation.name.toLowerCase();

    const handlePayment = async () => {
        if (!gateway) {
            setError('Payment gateway not selected');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            if (!user?.id) {
                setError('User authentication required');
                setIsProcessing(false);
                return;
            }

            const paymentData = {
                packageId: packageData.id,
                amount: parseFloat(packageData.price.toString()),
                currency: gateway.settings?.currency || 'USD',
                userId: user.id, // Send user ID from auth context
            };

            let response;
            if (gateway.name === 'stripe') {
                response = await paymentService.createStripeIntent(paymentData);
                if (response.success && response.data) {
                    setStripeClientSecret(response.data.clientSecret);
                    setTransactionId(response.data.transactionId);
                    // Stripe form will handle the rest
                }
            } else if (gateway.name === 'paypal') {
                response = await paymentService.createPayPalOrder(paymentData);
                if (response.success && response.data) {
                    // TODO: Integrate PayPal SDK button
                    // For now, show message
                    alert('PayPal integration: Add your PayPal SDK credentials to enable PayPal payments.');
                }
            } else if (gateway.name === 'jazzcash') {
                response = await paymentService.createJazzCashRequest(paymentData);
                if (response.success && response.data) {
                    if (response.data.formData) {
                        // Show form for JazzCash
                        setJazzcashFormData(response.data);
                    } else if (response.data.redirectUrl) {
                        window.location.href = response.data.redirectUrl;
                    }
                }
            }
        } catch (error: any) {
            setError(error.message || 'Payment processing failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleStripeSuccess = () => {
        router.push(`/packages/payment/success?transactionId=${transactionId}&packageId=${packageData.id}`);
    };

    const handleJazzCashSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (jazzcashFormData?.formData) {
            // Create a form and submit it
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = jazzcashFormData.redirectUrl;

            Object.entries(jazzcashFormData.formData).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value as string;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <PageWithHeroLayout>
            <div className={styles.orderContainer}>
                <div className={styles.orderContent}>
                    <h1 className={styles.orderTitle}>{t('orderSummary') || 'Order Summary'}</h1>

                    {/* Package Details Card */}
                    <div className={`${styles.packageCard} ${styles[planType]}`}>
                        <header className={styles.packageHeader}>
                            <h2 className={styles.packageName}>
                                {packageData.translation.name} {t('membership')}
                            </h2>
                            <span className={styles.packageBadge}>
                                {packageData.translation.name.toUpperCase()}
                            </span>
                        </header>

                        <div className={styles.packageBody}>
                            <div className={styles.packagePrice}>
                                <span className={styles.priceAmount}>
                                    {t('USD')} {packageData.price}
                                </span>
                                <span className={styles.pricePeriod}>/{t('monthly')}</span>
                            </div>

                            <div className={styles.packageDuration}>
                                <p>
                                    <strong>{t('duration')}:</strong> {durationDays} {t('days')} + {freeTrialDays} {t('days')} ({t('free')})
                                </p>
                            </div>

                            <div className={styles.packageDetails}>
                                <p>{packageData.translation.detail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Gateway Info */}
                    {gateway && (
                        <div className={styles.gatewayInfo}>
                            <h3 className={styles.gatewayTitle}>
                                {t('paymentMethod') || 'Payment Method'}
                            </h3>
                            <div className={styles.gatewayCard}>
                                <span className={styles.gatewayName}>{gateway.display_name}</span>
                                {gateway.description && (
                                    <p className={styles.gatewayDescription}>{gateway.description}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Stripe Payment Form */}
                    {stripeClientSecret && gateway?.name === 'stripe' && transactionId && (
                        <div className={styles.paymentFormContainer}>
                            <h3 className={styles.paymentFormTitle}>
                                {t('enterCardDetails') || 'Enter Card Details'}
                            </h3>
                            <StripePaymentForm
                                clientSecret={stripeClientSecret}
                                amount={parseFloat(packageData.price.toString())}
                                currency={gateway.settings?.currency || 'USD'}
                                transactionId={transactionId}
                                onSuccess={handleStripeSuccess}
                                onError={(err) => setError(err)}
                            />
                        </div>
                    )}

                    {/* JazzCash Payment Form */}
                    {jazzcashFormData && gateway?.name === 'jazzcash' && (
                        <div className={styles.paymentFormContainer}>
                            <h3 className={styles.paymentFormTitle}>
                                {t('redirectingToJazzCash') || 'Redirecting to JazzCash'}
                            </h3>
                            <form onSubmit={handleJazzCashSubmit}>
                                <p className={styles.jazzcashMessage}>
                                    {t('jazzcashRedirectMessage') || 'You will be redirected to JazzCash to complete your payment.'}
                                </p>
                                <button
                                    type="submit"
                                    className={styles.submitJazzCashButton}
                                >
                                    {t('continueToJazzCash') || 'Continue to JazzCash'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    {/* Action Buttons - Only show if payment form is not displayed */}
                    {!stripeClientSecret && !jazzcashFormData && (
                        <div className={styles.actionButtons}>
                            <button
                                className={styles.backButton}
                                onClick={() => router.push('/packages')}
                            >
                                {t('back') || 'Back to Packages'}
                            </button>
                            <button
                                className={styles.payButton}
                                onClick={handlePayment}
                                disabled={isProcessing || !gateway}
                            >
                                {isProcessing
                                    ? (t('processing') || 'Processing...')
                                    : (t('proceedToPayment') || 'Proceed to Payment')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </PageWithHeroLayout>
    );
}

