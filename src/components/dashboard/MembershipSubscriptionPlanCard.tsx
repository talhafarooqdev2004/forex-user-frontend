import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';
import styles from './MembershipSubscriptionPlanCard.module.scss';

export default function MembershipSubscriptionPlanCard(
    subscriptionPlan: PackageDTO
) {
    const durationDays = Math.floor(subscriptionPlan.durationHours / 24);
    const freeDays = Math.floor(subscriptionPlan.freeTrialHours / 24);
    const planType = subscriptionPlan.translation.name.toLowerCase();

    return (
        <>
            <div className={`${styles["subscription-plan-card"]} ${styles[planType]}`}>
                <header className={styles["subscription-plan-card__header"]}>
                    <h1 className={styles["subscription-plan-card__name"]}>{subscriptionPlan.translation.name} Membership</h1>
                    <span className={styles["subscription-plan-card__badge"]}>{subscriptionPlan.translation.name.toUpperCase()}</span>
                </header>
                <div className={styles["subscription-plan-card__body"]}>
                    {/* <span className={styles["subscription-plan-card__tax-price"]}>Tax Included: USD {subscriptionPlan.taxInclusivePrice}</span> */}
                    <div className={styles["subscription-plan-card__prices"]}>
                        <span className={styles["subscription-plan-card__discounted-price"]}>
                            USD {subscriptionPlan.price}
                            <span className={styles["subscription-plan-card__price-period"]}>/montly</span>
                            {/* <span className={styles["subscription-plan-card__original-price"]}>USD {subscriptionPlan.originalPrice}</span> */}
                        </span>
                    </div>
                    <span className={styles["subscription-plan-card__duration"]}>Duration: {durationDays} Days + {freeDays} Days (Free)</span>
                    <textarea
                        placeholder='Text Here'
                        name=""
                        id=""
                        rows={3}
                        readOnly
                        defaultValue={subscriptionPlan.translation.detail}
                        className={styles["subscription-plan-card__text-box"]}
                    >
                    </textarea>
                </div>
                <footer className={styles["subscription-plan-card__footer"]}>
                    <button className={styles["subscription-plan-card__subscribe-btn"]}>SUBSCRIBE</button>
                </footer>
            </div>
        </>
    );
}