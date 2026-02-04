import styles from './NewsEvents.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

export function NewsEvents() {
    const t = useTranslations('insights.news');

    const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <span className={styles.highlightedText}>{children}</span>
    );

    const newsArticles = [
        {
            id: 1,
            image: "/images/insights/news-events/news-1.png",
        },
        {
            id: 2,
            image: "/images/insights/news-events/news-1.png",
        },
        {
            id: 3,
            image: "/images/insights/news-events/news-1.png",
        },
        {
            id: 4,
            image: "/images/insights/news-events/news-1.png",
        },
        {
            id: 5,
            image: "/images/insights/news-events/news-1.png",
        }
    ];

    // Duplicate articles for seamless infinite scroll
    const marqueeArticles = [...newsArticles, ...newsArticles];

    return (
        <>
            <section className={styles.newsEvents}>
                <header className={styles.newsEventsInsightHeader}>
                    <div className={styles.newsEventsInsightHeaderTitle}>
                        <h1>{t('title')}</h1>
                    </div>
                </header>
            </section>

            {/* First carousel row */}
            <div className={styles.newsEventsArticleContainer}>
                <div className={styles.carouselWrapper}>
                    <div className={styles.carouselTrack}>
                        {marqueeArticles.map((article, index) => (
                            <article key={index} className={styles.newsEventsArticleItem}>
                                <div className={styles.newsEventsArticleCard}>
                                    <div className={styles.newsEventsArticleCardImage}>
                                        <Image
                                            src={article.image}
                                            alt={t('title')}
                                            width={1000}
                                            height={1000}
                                            className={styles.newsEventsArticleCardImage}
                                        />
                                    </div>
                                    <div className={styles.newsEventsArticleCardContent}>
                                        <p className={styles.cardDescription}>
                                            At <Highlight>Forex Fundamental Trends</Highlight>, we bring you
                                            the latest market-moving news and events that impact currency trading.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            {/* Second carousel row, opposite direction */}
            <div className={styles.newsEventsArticleContainer}>
                <div className={styles.carouselWrapper}>
                    <div className={styles.carouselTrackReverse}>
                        {marqueeArticles.map((article, index) => (
                            <article key={"reverse-" + index} className={styles.newsEventsArticleItem}>
                                <div className={styles.newsEventsArticleCard}>
                                    <div className={styles.newsEventsArticleCardImage}>
                                        <Image
                                            src={article.image}
                                            alt={t('title')}
                                            width={1000}
                                            height={1000}
                                            className={styles.newsEventsArticleCardImage}
                                        />
                                    </div>
                                    <div className={styles.newsEventsArticleCardContent}>
                                        <p className={styles.cardDescription}>
                                            At <Highlight>Forex Fundamental Trends</Highlight>, we bring you
                                            the latest market-moving news and events that impact currency trading.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}