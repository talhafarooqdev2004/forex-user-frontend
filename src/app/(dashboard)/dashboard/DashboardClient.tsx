"use client";

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import Aside from '@/components/dashboard/Aside';
import styles from './dashboard.module.scss';
import '@/styles/dashboard-override.scss';
import ProfileCard from '@/components/dashboard/ProfileCard';
import SubscriptionAlert from '@/components/dashboard/SubscriptionAlert';
import MembershipSubscriptionPlans from '@/components/dashboard/MembershipSubscriptionPlans';
import TradingNews from '@/components/dashboard/TradingNews';
import { FiMenu, FiX } from 'react-icons/fi';
import { PackageDTO } from '@/types/results/PackagesIndexResultDTO';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface DashboardClientProps {
    subscriptionPackages: PackageDTO[];
}

export default function DashboardClient({ subscriptionPackages }: DashboardClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect to home if not authenticated after loading completes
        if (!isLoading && !user) {
            console.log('No user found, redirecting to home');
            router.push('/');
        }
    }, [user, isLoading, router]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Don't render dashboard if user is not authenticated
    if (!user) {
        return null;
    }

    const userName = user ? `${user.firstName} ${user.lastName}` : '';
    const userEmail = user?.email || '';
    // Phone number is not in user model, so using placeholder or empty
    const userPhone = '+1-234-567-8900'; // Placeholder since phone is not in user model

    console.log('Dashboard rendering with user:', user);

    return (
        <>
            <div className={styles["dashboard"]}>
                {/* Mobile Overlay */}
                <div
                    className={`${styles["sidebar-overlay"]} ${isSidebarOpen ? styles["sidebar-overlay--open"] : ""}`}
                    onClick={closeSidebar}
                />

                {/* Sidebar */}
                <div className={`${styles["sidebar"]} ${styles["sidebar-bg-dark"]} ${isSidebarOpen ? styles["sidebar--open"] : ""}`}>
                    <Aside onClose={closeSidebar} />
                </div>

                <div className={styles["dashboard__panel"]}>
                    <Header
                        className={`${styles["dashboard-header"]} ${styles["dashboard-header--bg-light"]}`}
                        headingClassName={`${styles["dashboard-header__heading"]} ${styles["text-primary"]}`}
                        actionsClassName={styles["dashboard-header__actions"]}
                        notificationClassName={styles["dashboard-header__notification"]}
                        notificationImgClassName={styles["dashboard-header__notification-img"]}
                        notificationIndicatorClassName={styles["dashboard-header__notification__indicator"]}
                        profileNavigationClassName={styles["dashboard-header__profile-navigation"]}
                        profileImgWrapperClassName={styles["dashboard-header__profile-img-wrapper"]}
                        profileImgClassName={styles["dashboard-header__profile-img"]}
                        profileInfoClassName={styles["dashboard-header__profile-info"]}
                        userNameClassName={styles["dashbard-header__user-name"]}
                        userRoleClassName={styles["dashboard-header__user-role"]}
                        downArrowClassName={styles["down-arrow"]}
                    >
                        {/* Mobile Hamburger Menu */}
                        <button
                            className={styles["mobile-menu-toggle"]}
                            onClick={toggleSidebar}
                            aria-label="Toggle mobile menu"
                        >
                            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </Header>
                    <main className={styles["dashboard__content"]}>
                        <div className={styles["dashboard__account-overview"]}>
                            <ProfileCard
                                name={userName}
                                email={userEmail}
                                phone={userPhone}
                                profileImg="/images/dashboard/account-profile.jpg"
                                emailIcon="/images/dashboard/gmail-icon.svg"
                                phoneIcon="/images/dashboard/phone-icon.svg"
                            />
                            <SubscriptionAlert
                                userName={userName}
                                subscriptionName="Silver Membership"
                                validityDays={30}
                                freeDays={10}
                                expiryDate="21 / 08 / 2024 – 11:59 PM"
                            />
                        </div>
                        <MembershipSubscriptionPlans subscriptionPackages={subscriptionPackages} />
                        <TradingNews />
                    </main>
                </div>
            </div>
        </>
    );
}
