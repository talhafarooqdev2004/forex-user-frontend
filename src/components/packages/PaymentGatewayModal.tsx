"use client";

import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { paymentGatewayService, PaymentGateway } from '@/services/paymentGatewayService';
import { useAuth } from '@/contexts/AuthContext';
import styles from './PaymentGatewayModal.module.scss';

interface PaymentGatewayModalProps {
    show: boolean;
    onHide: () => void;
    packageId: number;
    packagePrice: number;
}

export default function PaymentGatewayModal({ show, onHide, packageId, packagePrice }: PaymentGatewayModalProps) {
    const t = useTranslations('package');
    const router = useRouter();
    const { user } = useAuth();
    const [gateways, setGateways] = useState<PaymentGateway[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (show) {
            fetchGateways();
        }
    }, [show]);

    const fetchGateways = async () => {
        try {
            setIsLoading(true);
            const activeGateways = await paymentGatewayService.getActiveGateways();
            setGateways(activeGateways);
            if (activeGateways.length > 0) {
                setSelectedGateway(activeGateways[0]);
            }
        } catch (error) {
            console.error('Failed to fetch payment gateways:', error);
            setError('Failed to load payment gateways');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProceed = () => {
        if (!selectedGateway) {
            setError('Please select a payment gateway');
            return;
        }

        if (!user) {
            setError('Please login to continue');
            return;
        }

        // Navigate to order page with package and gateway info
        router.push(`/packages/order?packageId=${packageId}&gateway=${selectedGateway.name}`);
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop={true}
            dialogClassName={styles.modalDialog}
        >
            <div className={styles.modalContent}>
                <button
                    className={styles.closeButton}
                    onClick={onHide}
                >
                    <FaTimes />
                </button>

                <h2 className={styles.modalHeader}>
                    {t('selectPaymentMethod') || 'Select Payment Method'}
                </h2>

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className={styles.loading}>Loading payment methods...</div>
                ) : gateways.length === 0 ? (
                    <div className={styles.noGateways}>
                        No payment methods available at the moment.
                    </div>
                ) : (
                    <>
                        <div className={styles.gatewaysList}>
                            {gateways.map((gateway) => (
                                <div
                                    key={gateway.id}
                                    className={`${styles.gatewayItem} ${selectedGateway?.id === gateway.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedGateway(gateway)}
                                >
                                    <div className={styles.gatewayInfo}>
                                        <h3 className={styles.gatewayName}>{gateway.display_name}</h3>
                                        {gateway.description && (
                                            <p className={styles.gatewayDescription}>{gateway.description}</p>
                                        )}
                                    </div>
                                    <div className={styles.radioButton}>
                                        <input
                                            type="radio"
                                            name="gateway"
                                            checked={selectedGateway?.id === gateway.id}
                                            onChange={() => setSelectedGateway(gateway)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            className={styles.proceedButton}
                            onClick={handleProceed}
                            disabled={!selectedGateway}
                        >
                            {t('proceedToPayment') || 'Proceed to Payment'}
                        </Button>
                    </>
                )}
            </div>
        </Modal>
    );
}

