"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import PageWithHeroLayout from '@/components/layouts/PageWithHeroLayout';
import styles from './PaymentSuccessClient.module.scss';

interface PaymentSuccessClientProps {
    transactionId: string;
    packageId?: string;
    locale: string;
}

export default function PaymentSuccessClient({
    transactionId,
    packageId,
    locale,
}: PaymentSuccessClientProps) {
    const t = useTranslations('package');
    const router = useRouter();
    const { user } = useAuth();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (!user) {
            router.push('/packages');
            return;
        }

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Redirect to admin dashboard (forex-admin app)
                    const adminDashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL || 'http://localhost:3001/dashboard';
                    window.location.href = adminDashboardUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [user, router]);

    return (
        <PageWithHeroLayout>
            <div className={styles.successContainer}>
                <div className={styles.successContent}>
                    <div className={styles.successIcon}>✓</div>
                    <h1 className={styles.successTitle}>
                        {t('paymentSuccess') || 'Payment Successful!'}
                    </h1>
                    <p className={styles.successMessage}>
                        {t('paymentSuccessMessage') || 'Your payment has been processed successfully. Your subscription is now active.'}
                    </p>
                    {transactionId && (
                        <p className={styles.transactionId}>
                            {t('transactionId') || 'Transaction ID'}: {transactionId}
                        </p>
                    )}
                    <div className={styles.actionButtons}>
                        <button
                            className={styles.dashboardButton}
                            onClick={() => {
                                const adminDashboardUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL || 'http://localhost:3001/dashboard';
                                window.location.href = adminDashboardUrl;
                            }}
                        >
                            {t('goToDashboard') || 'Go to Dashboard'}
                        </button>
                        <button
                            className={styles.packagesButton}
                            onClick={() => router.push('/packages')}
                        >
                            {t('backToPackages') || 'Back to Packages'}
                        </button>
                    </div>
                    <p className={styles.redirectMessage}>
                        {t('redirectingIn') || 'Redirecting to dashboard in'} {countdown} {t('seconds') || 'seconds'}...
                    </p>
                </div>
            </div>
        </PageWithHeroLayout>
    );
}

