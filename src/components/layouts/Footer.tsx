"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerLogo}>Forex Fundamental Trends</h3>
                    <p className={styles.footerDescription}>
                        {t('description')}
                    </p>
                </div>

                <div className={styles.footerSection}>
                    <h4 className={styles.footerTitle}>{t('quickLinks')}</h4>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/">{t('home')}</Link></li>
                        <li><Link href="/about">{t('aboutUs')}</Link></li>
                        <li><Link href="/dashboard">{t('packages')}</Link></li>
                        <li><Link href="/">{t('forum')}</Link></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4 className={styles.footerTitle}>{t('contact')}</h4>
                    <div className={styles.footerContact}>
                        <p>{t('email')}: support@forexfundamentaledge.com</p>
                        <p>{t('phone')}: +1 (555) 123-4567</p>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; 2024 Forex Fundamental Trends. {t('allRightsReserved')}</p>
            </div>
        </footer>
    );
} 