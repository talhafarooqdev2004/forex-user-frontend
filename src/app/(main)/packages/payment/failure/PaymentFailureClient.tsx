"use client";

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PageWithHeroLayout from '@/components/layouts/PageWithHeroLayout';
import styles from './PaymentFailureClient.module.scss';

interface PaymentFailureClientProps {
    transactionId?: string;
    error?: string;
    locale: string;
}

export default function PaymentFailureClient({
    transactionId,
    error,
    locale,
}: PaymentFailureClientProps) {
    const t = useTranslations('package');
    const router = useRouter();

    return (
        <PageWithHeroLayout>
            <div className={styles.failureContainer}>
                <div className={styles.failureContent}>
                    <div className={styles.failureIcon}>✗</div>
                    <h1 className={styles.failureTitle}>
                        {t('paymentFailed') || 'Payment Failed'}
                    </h1>
                    <p className={styles.failureMessage}>
                        {error || t('paymentFailedMessage') || 'Unfortunately, your payment could not be processed. Please try again or contact support.'}
                    </p>
                    {transactionId && (
                        <p className={styles.transactionId}>
                            {t('transactionId') || 'Transaction ID'}: {transactionId}
                        </p>
                    )}
                    <div className={styles.actionButtons}>
                        <button
                            className={styles.retryButton}
                            onClick={() => router.push('/packages')}
                        >
                            {t('tryAgain') || 'Try Again'}
                        </button>
                        <button
                            className={styles.supportButton}
                            onClick={() => router.push('/contact')}
                        >
                            {t('contactSupport') || 'Contact Support'}
                        </button>
                    </div>
                </div>
            </div>
        </PageWithHeroLayout>
    );
}

