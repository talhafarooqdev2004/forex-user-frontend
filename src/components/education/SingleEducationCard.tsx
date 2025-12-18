"use client";

import styles from './SingleEducationCard.module.scss';
import { EducationDTO } from '@/types/results/EducationsIndexResultDTO';

type SingleEducationCardProps = {
    education: EducationDTO;
}

export default function SingleEducationCard({ education }: SingleEducationCardProps) {
    return (
        <div className={styles['single-education-card']}>
            <div className={styles['single-education-card__content-wrapper']}>
                <div className={styles['single-education-card__content']}>
                    <header className={styles['single-education-card__header']}>
                        <h1 className={styles['single-education-card__title']}>
                            {education.translation.title}
                        </h1>
                    </header>
                    <div className={styles['single-education-card__body']}>
                        <div 
                            className={styles['single-education-card__content-text']}
                            dangerouslySetInnerHTML={{ __html: education.translation.content }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

