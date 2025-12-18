'use client';

import { PostDTO } from '@/types/results/PostsIndexResultDTO';
import styles from './ForumPostCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { commentService } from '@/services/Forum/commentService';

interface ForumPostCardProps {
    post: PostDTO;
}

export default function ForumPostCard({ post }: ForumPostCardProps) {
    const [commentCount, setCommentCount] = useState<number>(0);
    const [isLoadingCount, setIsLoadingCount] = useState(true);

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const count = await commentService.getCommentCount(post.id);
                setCommentCount(count);
            } catch (error) {
                console.error('Error fetching comment count:', error);
            } finally {
                setIsLoadingCount(false);
            }
        };
        fetchCommentCount();
    }, [post.id]);

    const truncatedSummary = post.translation.content.length > 150
        ? post.translation.content.substring(0, 150) + '...'
        : post.translation.content;
    const shouldShowReadMore = post.translation.content.length > 150;

    const postDate = new Date(post.createdAt);
    const now = new Date();

    const exactOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const exactDateString = postDate.toLocaleString('en-US', exactOptions);

    const diffMs = now.getTime() - postDate.getTime();

    let relativeTimeString = '';

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (diffMs < minute) {
        relativeTimeString = '(just now)';
    } else if (diffMs < hour) {
        const diffMinutes = Math.floor(diffMs / minute);
        relativeTimeString = `(${diffMinutes} minutes ago)`;
    } else if (diffMs < day) {
        const diffHours = Math.floor(diffMs / hour);
        relativeTimeString = `(${diffHours} hours ago)`;
    } else {
        const diffDays = Math.floor(diffMs / day);
        relativeTimeString = `(${diffDays} days ago)`;
    }

    const fullDateDisplay = `${exactDateString} ${relativeTimeString}`;

    return (
        <div className={styles['forum-post-card']}>
            {/* ... Image and Link JSX ... */}
            <div className={styles['forum-post-card__image_wrapper']}>
                <Image
                    src="/images/dashboard/forum/forum-post-card-image.svg"
                    alt="Forum Post Card Image"
                    width={100}
                    height={100}
                    className={styles['forum-post-card__image']}
                />
            </div>
            <div className={styles['forum-post-card__content']}>
                <div className={styles['forum-post-card__content__header']}>
                    <Link href={`/forum/${post.slug}`}>
                        <h3 className={styles['forum-post-card__title']}>
                            {post.translation.title}
                        </h3>
                    </Link>
                    <div className={styles['forum-post-card__date']}>
                        {fullDateDisplay}
                    </div>
                </div>
                <p className={styles['forum-post-card__summary']}>
                    {truncatedSummary}
                    {shouldShowReadMore && (
                        <a href="#" className={styles['forum-post-card__read-more']}> Read more</a>
                    )}
                </p>
                <div className={styles['forum-post-card__replies']}>
                    {isLoadingCount ? (
                        'Loading...'
                    ) : (
                        `${commentCount} ${commentCount === 1 ? 'Reply' : 'Replies'}`
                    )}
                </div>
            </div>
        </div>
    );
}