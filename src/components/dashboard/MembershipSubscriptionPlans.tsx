import SubscriptionPlansContent from './SubscriptionPlansContent';
import styles from './MembershipSubscriptionPlans.module.scss';
import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';

interface MembershipSubscriptionPlansProps {
    subscriptionPackages: PackageDTO[];
}

export default function MembershipSubscriptionPlans({ subscriptionPackages }: MembershipSubscriptionPlansProps) {
    return (
        <div className={styles["membership-subscription-plans"]}>
            <header className={styles["membership-subscription-plans__header"]}>
                <h1 className={styles["membership-subscription-plans__heading"]}>Membership Subscription Plans</h1>
            </header>
            <SubscriptionPlansContent initialData={subscriptionPackages} />
        </div>
    );
}