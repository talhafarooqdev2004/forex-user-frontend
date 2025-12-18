'use client';

import useAboutContent from '@/hooks/useAboutContent';
import styles from './about.module.scss';
import {
    useLanguage
} from '@/components/LanguageProvider';
import {
    PageContentDTO
} from '@/types/results/PageContentIndexResultDTO';

interface Props {
    initialData: PageContentDTO[];
    initialLocale: string;
}

const AboutClient = ({
    initialData,
    initialLocale
}: Props) => {
    const {
        currentLanguage
    } = useLanguage();
    
    const {
        aboutContent,
        isLoading,
        isError
    } = useAboutContent({
        fallbackData: initialData,
        locale: currentLanguage || initialLocale,
    });

    const getContent = (key: string): string => {
        if (!aboutContent || aboutContent.length === 0) return '';
        const section = aboutContent.find(d => d.sectionKey === key);
        return section && section.translations ? section.translations.contentValue : '';
    };

    if (isLoading && !initialData) return <div> Loading... </div>;
    if (isError) return <div> Error fetching content </div>;

    return (
        <main className={styles.aboutMain}>
            <section className={styles.aboutHero}>
                <div className={styles.aboutHeroContent}>
                    <h1 className={styles.aboutTitle}>{getContent('hero_title')}</h1>
                    <p className={styles.aboutSubtitle}>{getContent('hero_description')}</p>
                </div>
            </section>
            <section className={styles.aboutContent}>
                <div className={styles.aboutSection}>
                    <h2 className={styles.sectionTitle}>{getContent('mission_title')}</h2>
                    <p className={styles.sectionText}>{getContent('mission_text')}</p>
                </div>
                <div className={styles.aboutSection}>
                    <h2 className={styles.sectionTitle}>{getContent('what_we_do_title')}</h2>
                    <p className={styles.sectionText}>{getContent('what_we_do_description')}</p>
                </div>
                <div className={styles.aboutSection}>
                    <h2 className={styles.sectionTitle}>{getContent('why_choose_title')}</h2>
                    <div className={styles.advantagesGrid}>
                        <div className={styles.advantageCard}>
                            <h3 className={styles.advantageTitle}>{getContent('card_1_title')}</h3>
                            <p className={styles.advantageText}>{getContent('card_1_description')}</p>
                        </div>
                        <div className={styles.advantageCard}>
                            <h3 className={styles.advantageTitle}>{getContent('card_2_title')}</h3>
                            <p className={styles.advantageText}>{getContent('card_2_description')}</p>
                        </div>
                        <div className={styles.advantageCard}>
                            <h3 className={styles.advantageTitle}>{getContent('card_3_title')}</h3>
                            <p className={styles.advantageText}>{getContent('card_3_description')}</p>
                        </div>
                        <div className={styles.advantageCard}>
                            <h3 className={styles.advantageTitle}>{getContent('card_4_title')}</h3>
                            <p className={styles.advantageText}>{getContent('card_4_description')}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.aboutSection}>
                    <h2 className={styles.sectionTitle}>{getContent('our_team_title')}</h2>
                    <p className={styles.sectionText}>{getContent('our_team_description')}</p>
                </div>
            </section>
        </main>
    );
};

export default AboutClient;
