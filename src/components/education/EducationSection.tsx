"use client";

import { EducationDTO } from '@/types/results/EducationsIndexResultDTO';
import styles from './EducationSection.module.scss';
import { useTranslations } from '@/hooks/useTranslations';
import useEducations from '@/hooks/useEducations';
import { useLanguage } from '../LanguageProvider';
import Link from 'next/link';

interface EducationSectionProps {
    initialEducations: EducationDTO[] | null;
    initialLocale: string;
}

export const EducationSection = ({ initialEducations, initialLocale }: EducationSectionProps) => {
    const { currentLanguage } = useLanguage();
    const { t } = useTranslations();

    const { educations } = useEducations({
        fallbackData: initialEducations,
        locale: currentLanguage || initialLocale,
    });

    const getFirstParagraph = (content: string, maxLength: number = 250): string => {
        if (!content) return '';
        
        // Find all paragraphs
        const paragraphMatches = content.match(/<p[^>]*>(.*?)<\/p>/gi);
        
        if (!paragraphMatches || paragraphMatches.length === 0) {
            // If no paragraph tag, try to get first text content from any element
            const textMatch = content.match(/>([^<]+)</);
            if (textMatch) {
                let text = textMatch[1].trim();
                // Strip any remaining HTML entities
                text = text.replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/gi, '');
                if (text.length > 0) {
                    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
                }
            }
            // If still no text, return default message
            return 'Click to read more...';
        }
        
        // Loop through all paragraphs to find the first one with actual text content
        for (const paragraphHtml of paragraphMatches) {
            // Extract content from paragraph
            const contentMatch = paragraphHtml.match(/<p[^>]*>(.*?)<\/p>/i);
            if (!contentMatch) continue;
            
            let text = contentMatch[1];
            
            // Remove images completely
            text = text.replace(/<img[^>]*>/gi, '');
            
            // Remove all HTML tags
            text = text.replace(/<[^>]+>/g, '');
            
            // Decode HTML entities
            text = text.replace(/&nbsp;/g, ' ');
            text = text.replace(/&amp;/g, '&');
            text = text.replace(/&lt;/g, '<');
            text = text.replace(/&gt;/g, '>');
            text = text.replace(/&quot;/g, '"');
            text = text.replace(/&#39;/g, "'");
            
            // Clean up whitespace
            text = text.trim().replace(/\s+/g, ' ');
            
            // If this paragraph has text content, return it
            if (text.length > 0) {
                return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
            }
        }
        
        // If all paragraphs are empty (only images), return default message
        return 'Click to read more...';
    };

    return (
        <section className={styles.educationSection}>
            <header className={styles.educationSectionHeader}>
                <div className={styles.educationSectionTitle}>
                    <h1>{t('insights.education.title')}</h1>
                </div>
                <h2 className={styles.educationSectionShortDescription}>
                    {t('insights.education.shortDescription.before')}{' '}
                    <span className={styles.highlightedText}>
                        {t('insights.education.shortDescription.highlight1')}
                    </span>{' '}
                    {t('insights.education.shortDescription.between')}{' '}
                    <span className={styles.highlightedText}>
                        {t('insights.education.shortDescription.highlight2')}
                    </span>
                    {t('insights.education.shortDescription.after')}
                </h2>
            </header>

            <main>
                <div className={styles.educationContainer}>
                    {educations?.map((education) => (
                        <article key={education.id} className={styles.educationCard}>
                            <header className={styles.educationCardHeader}>
                                <h3 className={styles.educationCardTitle}>
                                    {education.translation.title}
                                </h3>
                            </header>
                            <div className={styles.educationCardBody}>
                                <p className={styles.educationCardDescription}>
                                    {getFirstParagraph(education.translation.content)}
                                </p>
                            </div>
                            <footer className={styles.educationCardFooter}>
                                <Link
                                    href={`/education/${education.slug}`}
                                    className={styles.educationCardButton}
                                >
                                    {t('insights.education.learnMore')}
                                </Link>
                            </footer>
                        </article>
                    ))}
                </div>
            </main>

            <footer className={styles.educationSectionFooter}>
                <p>
                    {t('insights.education.footerDescription.before')}{' '}
                    <span className={styles.highlightedText}>
                        {t('insights.education.footerDescription.highlight')}
                    </span>
                    , {t('insights.education.footerDescription.content')}
                </p>
            </footer>
        </section>
    );
};