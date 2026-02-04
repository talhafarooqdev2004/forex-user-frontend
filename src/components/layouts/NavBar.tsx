"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.scss';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { FiX } from "react-icons/fi";

interface NavBarProps {
    isOpen?: boolean;
    closeMenu?: () => void;
}

export function NavBar({ isOpen = false, closeMenu }: NavBarProps) {
    const t = useTranslations('navigation');
    const { user } = useAuth();

    const handleCloseMenu = () => {
        closeMenu?.();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className={styles.overlay} onClick={handleCloseMenu}></div>}

            {/* Original Nav for Desktop */}
            <nav className={styles.desktopNav}>
                <ul className={styles.headerNavigation}>
                    <li><Link href={`/`} className={styles.navLinks}>{t('home')}</Link></li>
                    <li><Link href={`/about`} className={styles.navLinks}>{t('aboutUs')}</Link></li>
                    <li><Link href="/packages" className={styles.navLinks}>{t('packages')}</Link></li>
                    <li><Link href={`/forum`} className={styles.navLinks}>{t('forum')}</Link></li>
                    {user && <li><Link href="http://localhost:3000/dashboard" className={styles.navLinks}>{t('dashboard')}</Link></li>}
                </ul>
            </nav>

            {/* Sidebar for Mobile/Tablet */}
            <div className={`${styles.mobileNav} ${isOpen ? styles.isOpen : ''}`}>
                <div className={styles.mobileNavHeader}>
                    <Image
                        src="/images/brand-logo.jpeg"
                        alt="Brand Logo"
                        width={100}
                        height={33}
                        style={{ objectFit: 'contain' }}
                    />
                    <button onClick={handleCloseMenu} className={styles.closeButton} aria-label="Close menu">
                        <FiX size={30} />
                    </button>
                </div>
                <nav>
                    <ul className={styles.mobileNavLinks}>
                        <li><Link href={`/`} className={styles.navLinks} onClick={handleCloseMenu}>{t('home')}</Link></li>
                        <li><Link href={`/about`} className={styles.navLinks} onClick={handleCloseMenu}>{t('aboutUs')}</Link></li>
                        <li><Link href="/packages" className={styles.navLinks} onClick={handleCloseMenu}>{t('packages')}</Link></li>
                        <li><Link href={`/forum`} className={styles.navLinks} onClick={handleCloseMenu}>{t('forum')}</Link></li>
                        {user && <li><Link href="/dashboard" className={styles.navLinks} onClick={handleCloseMenu}>{t('dashboard')}</Link></li>}
                    </ul>
                </nav>
            </div>
        </>
    )
}   