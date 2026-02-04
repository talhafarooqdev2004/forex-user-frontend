"use client";

import { useState } from 'react';
import styles from './PackagesCard.module.scss';
import { useTranslations } from 'next-intl';
import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import PaymentGatewayModal from './PaymentGatewayModal';

export default function PackagesCard(packageDTO: PackageDTO) {
    const t = useTranslations("package");
    const { user } = useAuth();
    const { openModal } = useAuthModal();
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Convert hours → days (1 day = 24 hours)
    const durationDays = Math.floor(packageDTO.durationHours / 24);
    const freeTrialDays = Math.floor(packageDTO.freeTrialHours / 24);
    const planType = packageDTO.translation.name.toLowerCase();

    // Commented out subscribe button functionality
    // const handleSubscribe = () => {
    //     if (!user) {
    //         // Show login modal if user is not logged in
    //         openModal('login');
    //         return;
    //     }

    //     // Show payment gateway selection modal
    //     setShowPaymentModal(true);
    // };

    return (
        <>
            <div className={`${styles["packages-card"]} ${styles[planType]}`}>
                <header className={styles["packages-card__header"]}>
                    <h1 className={styles["packages-card__name"]}>
                        {packageDTO.translation.name} {t("membership")}
                    </h1>
                    <span className={styles["packages-card__badge"]}>
                        {packageDTO.translation.name.toUpperCase()}
                    </span>
                </header>

                <div className={styles["packages-card__body"]}>
                    <div className={styles["packages-card__prices"]}>
                        <span className={styles["packages-card__discounted-price"]}>
                            {t("USD")} {packageDTO.price}
                            <span className={styles["packages-card__price-period"]}> /{t("monthly")}</span>
                        </span>
                    </div>

                    <span className={styles["packages-card__duration"]}>
                        {t("duration")}: {durationDays} {t("days")} + {freeTrialDays} {t("days")} ({t("free")})
                    </span>

                    <textarea
                        placeholder='Text Here'
                        defaultValue={packageDTO.translation.detail}
                        className={styles["packages-card__text-box"]}
                        readOnly
                    />
                </div>

                <footer className={styles["packages-card__footer"]}>
                    {/* Subscribe button commented out */}
                    {/* <button 
                        className={styles["packages-card__subscribe-btn"]}
                        onClick={handleSubscribe}
                    >
                        {t("subscribe")}
                    </button> */}
                </footer>
            </div>

            {/* PaymentGatewayModal commented out - subscribe button disabled */}
            {/* <PaymentGatewayModal
                show={showPaymentModal}
                onHide={() => setShowPaymentModal(false)}
                packageId={packageDTO.id}
                packagePrice={parseFloat(packageDTO.price.toString())}
            /> */}
        </>
    );
}
