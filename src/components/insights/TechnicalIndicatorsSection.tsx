import React from "react";
import { Card, CardContent } from "../ui/card";
import styles from "./TechnicalIndicatorsSection.module.scss";
import { useTranslations } from 'next-intl';

export const TechnicalIndicatorsSection = (): React.ReactElement => {
    const t = useTranslations('insights.technicalIndicators');

    const tabOptions = [
        {
            id: "risk-mode",
            className: styles.riskModeTab,
            content: (
                <div className={styles.tabTitle}>
                    <span className={styles.riskText}>{t('tabs.riskMode.risk')}</span>
                    <span className={styles.modeText}>{t('tabs.riskMode.mode')}</span>
                </div>
            ),
        },
        {
            id: "retail-positions",
            className: styles.retailPositionsTab,
            content: (
                <div className={styles.tabTitle}>
                    <span className={styles.retailsText}>{t('tabs.retailPositions.retails')}</span>
                    <span className={styles.positionsText}>{t('tabs.retailPositions.positions')}</span>
                </div>
            ),
        },
    ];

    const educationalCards = [
        {
            id: "risk-on-off",
            image: "https://c.animaapp.com/mcm99dqyqhfZCv/img/vector-3.svg",
            title: t('cards.riskOnOff.title'),
            description: (
                <>
                    At Forex Fundamental Trends, The Fundamental
                    attribution error is a cognititve bias where individuals
                    tend to overemphasize personality traits when
                    eplaining the begaviour of other.
                </>
            ),
            content: (
                <div className={styles.riskOnOffContent}>
                    <div className={styles.riskOnOffTitle}>
                        {t('cards.riskOnOff.title')}
                    </div>

                    <div className={styles.riskOnOffGraphics}>
                        <img
                            className={styles.ellipse1}
                            alt={t('cards.riskOnOff.altText')}
                            src="https://c.animaapp.com/mcm99dqyqhfZCv/img/ellipse-3278.svg"
                        />

                        <img
                            className={styles.ellipse2}
                            alt={t('cards.riskOnOff.altText')}
                            src="https://c.animaapp.com/mcm99dqyqhfZCv/img/ellipse-3280.svg"
                        />

                        <img
                            className={styles.ellipse3}
                            alt={t('cards.riskOnOff.altText')}
                            src="https://c.animaapp.com/mcm99dqyqhfZCv/img/ellipse-3282.svg"
                        />

                        <div className={styles.circle} />

                        <img
                            className={styles.vector}
                            alt={t('cards.riskOnOff.altText')}
                            src="https://c.animaapp.com/mcm99dqyqhfZCv/img/vector-783.svg"
                        />

                        <div className={styles.offText}>
                            <span>O</span>
                            <span>F</span>
                            <span>F</span>
                        </div>

                        <div className={styles.onText}>
                            <span>O</span>
                            <span>N</span>
                        </div>

                        <img
                            className={styles.mainEllipse}
                            alt={t('cards.riskOnOff.altText')}
                            src="https://c.animaapp.com/mcm99dqyqhfZCv/img/ellipse-3284.svg"
                        />

                        <div className={styles.neutralText}>
                            <span>N</span>
                            <span>e</span>
                            <span>u</span>
                            <span>t</span>
                            <span>r</span>
                            <span>a</span>
                            <span>l</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: "retail-positions",
            image: "https://c.animaapp.com/mcm99dqyqhfZCv/img/vector-4.svg",
            title: t('cards.retailPositions.title'),
            description: (
                <>
                    At Forex Fundamental Trends, The Fundamental
                    attribution error is a cognititve bias where individuals
                    tend to overemphasize personality traits when
                    eplaining the begaviour of other.
                </>
            ),
            content: (
                <img
                    className={styles.retailPositionsChart}
                    alt={t('cards.retailPositions.chartAltText')}
                    src="https://c.animaapp.com/mcm99dqyqhfZCv/img/group-1171276110.png"
                />
            ),
        },
    ];

    return (
        <section className={styles.technicalIndicatorsSection}>
            <div className={styles.cardsContainer}>
                {/* Risk Mode Box */}
                <div className={styles.cardBox}>
                    <button className={`${styles.tabButton} ${tabOptions[0].className}`}>
                        {tabOptions[0].content}
                    </button>
                    <Card className={styles.card}>
                        <CardContent className={styles.cardContent}>
                            <img
                                className={styles.cardBackgroundSmall}
                                alt={`${educationalCards[0].title} background`}
                                src={educationalCards[0].image}
                            />
                            {educationalCards[0].content}
                            <div className={styles.fundamentalText}>
                                <span className={styles.highlight}>At Forex Fundamental Trends</span>, The Fundamental
                                attribution error is a cognititve bias where individuals
                                tend to overemphasize personality traits when
                                eplaining the begaviour of other.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Retail Positions Box */}
                <div className={styles.cardBox}>
                    <button className={`${styles.tabButton} ${tabOptions[1].className}`}>
                        {tabOptions[1].content}
                    </button>
                    <Card className={styles.card}>
                        <CardContent className={styles.cardContent}>
                            <img
                                className={styles.cardBackgroundLarge}
                                alt={`${educationalCards[1].title} background`}
                                src={educationalCards[1].image}
                            />
                            {educationalCards[1].content}
                            <div className={styles.fundamentalText2}>
                                <span className={styles.highlight}>At Forex Fundamental Trends</span>, The Fundamental
                                attribution error is a cognititve bias where individuals
                                tend to overemphasize personality traits when
                                eplaining the begaviour of other.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
