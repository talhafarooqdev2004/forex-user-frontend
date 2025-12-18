'use client';

import styles from './ForumLayout.module.scss';
import ForumCategoryFilters from './ForumCategoryFilters';
import ForumPostCard from './ForumPostCard';
import ForumPagination from './ForumPagination';
import { useState, useEffect } from 'react';
import usePosts from '@/hooks/usePosts';
import { TopicDTO } from '@/types/results/TopicsIndexResultDTO';
import { useLanguage } from '../LanguageProvider';

export default function ForumLayout({ topics, initialPosts, initialTopicId, initialCategory }: any) {
    const { currentLanguage } = useLanguage();

    const [activeTopicId, setActiveTopicId] = useState<number>(initialTopicId);

    const topicsMap = topics.reduce((acc: Record<number, string>, topic: TopicDTO) => {
        acc[topic.id] = topic.translation?.title;
        return acc;
    }, {});

    const { posts } = usePosts({
        fallbackData: initialPosts,
        topicId: activeTopicId,
        locale: currentLanguage,
    });

    const handleTopicChange = (topicId: number) => {
        setActiveTopicId(topicId);
    };
    return (
        <div className={styles['forum-layout']}>
            <ForumCategoryFilters
                topics={topics}
                activeTopicId={activeTopicId}
                onTopicChange={handleTopicChange}
            />

            <div className={styles['forum-layout__section-title']}>
                <span>{topicsMap[activeTopicId]}</span>
            </div>

            <div className={styles['forum-layout__posts']}>
                {posts?.map((post) => (
                    <ForumPostCard
                        key={post.id}
                        post={post}
                    />
                ))}

                {/* <ForumPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                /> */}
            </div>
        </div>
    );
} 