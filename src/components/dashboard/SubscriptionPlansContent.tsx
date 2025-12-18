"use client";

import MembershipSubscriptionPlanCard from './MembershipSubscriptionPlanCard';
import MembershipSubscriptionPlanCardPlaceholder from './MembershipSubscriptionPlanCardPlaceholder';
import MembershipSubscriptionPlansList from './MembershipSubscriptionPlansList';
import { useSubscriptionPlans } from './useSubscriptionPlans';
import styles from './MembershipSubscriptionPlans.module.scss';
import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';

interface SubscriptionPlansContentProps {
    initialData: PackageDTO[];
}

export default function SubscriptionPlansContent({ initialData }: SubscriptionPlansContentProps) {
    const { subscriptionPlans, loading } = useSubscriptionPlans({ fallbackData: initialData });

    if (loading && !subscriptionPlans) {
        return (
            <MembershipSubscriptionPlansList className={styles["membership-subscription-plans__list"]}>
                {[1, 2, 3].map((index) => (
                    <MembershipSubscriptionPlanCardPlaceholder key={index} />
                ))}
            </MembershipSubscriptionPlansList>
        );
    }

    return (
        <MembershipSubscriptionPlansList className={styles["membership-subscription-plans__list"]}>
            {subscriptionPlans?.map((subscriptionPlan) => (
                <MembershipSubscriptionPlanCard
                    key={subscriptionPlan.id}
                    {...subscriptionPlan}
                />
            ))}
        </MembershipSubscriptionPlansList>
    );
} 