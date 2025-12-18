"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWithHeroLayout from "@/components/layouts/PageWithHeroLayout";
import ForumLayout from "@/components/forum/ForumLayout";
import ForumRepliesSection from "@/components/forum/ForumRepliesSection";
import { TopicDTO } from '@/types/results/TopicsIndexResultDTO';
import useTopics from '@/hooks/useTopics';
import { useLanguage } from '@/components/LanguageProvider';
import { PostDTO } from '@/types/results/PostsIndexResultDTO';

interface ForumClientPorps {
    initialtopics: TopicDTO[];
    initialPosts: PostDTO[];
    initialTopicId: number;
    initialLocale: string;
}

export default function ForumClient({ initialtopics, initialPosts, initialTopicId, initialLocale }: ForumClientPorps) {
    const searchParams = useSearchParams();
    const topicIdParam = searchParams?.get('topicId');
    const [activeTopicId, setActiveTopicId] = useState<number>(initialTopicId);

    const { currentLanguage } = useLanguage();

    const { topics } = useTopics({
        fallbackData: initialtopics,
        locale: currentLanguage || initialLocale,
    });

    // Update active topic when URL parameter changes
    useEffect(() => {
        if (topicIdParam) {
            const topicId = parseInt(topicIdParam, 10);
            if (!isNaN(topicId)) {
                setActiveTopicId(topicId);
            }
        }
    }, [topicIdParam]);

    const lastReplied = [
        {
            id: '1',
            userName: 'John Martin',
            timestamp: 'Jul 10, 7:45 pm (3 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '2',
            userName: 'John Martin',
            timestamp: 'Jul 10, 6:30 pm (4 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '3',
            userName: 'John Martin',
            timestamp: 'Jul 10, 5:15 pm (5 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '4',
            userName: 'John Martin',
            timestamp: 'Jul 10, 4:00 pm (6 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '5',
            userName: 'John Martin',
            timestamp: 'Jul 10, 3:30 pm (7 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '6',
            userName: 'John Martin',
            timestamp: 'Jul 10, 3:00 pm (8 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '7',
            userName: 'John Martin',
            timestamp: 'Jul 10, 2:30 pm (9 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '8',
            userName: 'John Martin',
            timestamp: 'Jul 10, 2:00 pm (10 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        }
    ];

    const hottestReplied = [
        {
            id: '9',
            userName: 'John Martin',
            timestamp: 'Jul 10, 7:45 pm (3 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '10',
            userName: 'John Martin',
            timestamp: 'Jul 10, 6:30 pm (4 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '11',
            userName: 'John Martin',
            timestamp: 'Jul 10, 5:15 pm (5 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '12',
            userName: 'John Martin',
            timestamp: 'Jul 10, 4:00 pm (6 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '13',
            userName: 'John Martin',
            timestamp: 'Jul 10, 3:30 pm (7 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '14',
            userName: 'John Martin',
            timestamp: 'Jul 10, 3:00 pm (8 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '15',
            userName: 'John Martin',
            timestamp: 'Jul 10, 2:30 pm (9 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        },
        {
            id: '16',
            userName: 'John Martin',
            timestamp: 'Jul 10, 2:00 pm (10 hr ago)',
            replyContent: 'Scalper Trading Technique is my go-to strategy. The quick entries work perfectly',
            relatedLink: 'Scalper Trading Technique Replied 2,315',
            avatarSrc: '/images/dashboard/account-profile.jpg'
        }
    ];

    return (
        <>
            <PageWithHeroLayout alignItems="flex-start">
                <ForumLayout 
                    topics={topics} 
                    initialPosts={initialPosts} 
                    initialTopicId={activeTopicId} 
                    initialCategory={topicIdParam} 
                />
            </PageWithHeroLayout>
            <ForumRepliesSection lastReplied={lastReplied} hottestReplied={hottestReplied} />
        </>
    );
}
