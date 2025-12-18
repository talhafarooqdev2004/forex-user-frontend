'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './SingleForumPostCard.module.scss';
import Link from 'next/link';
import CommentModal from './CommentModal';
import { PostDTO } from '@/types/results/PostsIndexResultDTO';
import { useAuth } from '@/contexts/AuthContext';
import { commentService } from '@/services/Forum/commentService';

type SingleForumPostCardProps = {
    post: PostDTO;
    onCommentAdded?: () => void;
}

export default function SingleForumPostCard({ post, onCommentAdded }: SingleForumPostCardProps) {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(0);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCommentCount = async () => {
            const count = await commentService.getCommentCount(post.id);
            setCommentCount(count);
        };
        fetchCommentCount();
    }, [post.id]);

    const handleCommentClick = () => {
        if (!user) {
            alert('Please login to comment on this post.');
            return;
        }
        setShowCommentModal(true);
    };

    const handleCloseModal = () => {
        setShowCommentModal(false);
    };

    const handleCommentAdded = async () => {
        setShowCommentModal(false);
        // Refresh comment count
        const count = await commentService.getCommentCount(post.id);
        setCommentCount(count);
        if (onCommentAdded) {
            onCommentAdded();
        }
    };

    return (
        <>
            <div className={styles['single-forum-post-card']}>
                <div className={styles['single-forum-post-card__heading']}>
                    <span>{post.topic}</span>
                </div>
                <div className={styles['single-forum-post-card__content-wrapper']}>
                    <div className={styles['single-forum-post-card__content']}>
                        <header className={styles['single-forum-post-card__header']}>
                            <Link href={`/forum/${post.slug}`}>
                                <h3 className={styles['single-forum-post-card__title']}>
                                    {post.translation.title}
                                </h3>
                            </Link>
                            <div className={styles['single-forum-post-card__date']}>
                                {/* {post.date} */}
                            </div>
                            <div className={styles['single-forum-post-card__replies']}>
                                {commentCount} {commentCount === 1 ? 'Reply' : 'Replies'}
                            </div>
                        </header>
                        <div className={styles['single-forum-post-card__body']}>
                            {/* {post.imageSrc && (
                                <div className={styles['single-forum-post-card__image-wrapper']}>
                                    <Image
                                        src={post.imageSrc}
                                        alt={post.title}
                                        fill
                                        className={styles['single-forum-post-card__image']}
                                    />
                                </div>
                            )} */}
                            <p className={styles['single-forum-post-card__summary']}>
                                {post.translation.content}
                            </p>
                        </div>
                    </div>
                    <footer className={styles['single-forum-post-card__footer']}>
                        <div className={styles['single-forum-post-card__actions']}>
                            <button
                                className={styles['single-forum-post-card__button']}
                                onClick={handleCommentClick}
                            >
                                Comment
                            </button>
                            <button
                                className={styles['single-forum-post-card__button']}
                                onClick={handleCommentClick}
                            >
                                <Image
                                    src="/images/dashboard/forum/comment-icon.svg"
                                    alt="comment icon"
                                    width={30}
                                    height={30}
                                />
                            </button>
                        </div>
                    </footer>
                </div>
            </div>

            <CommentModal
                show={showCommentModal}
                onHide={handleCloseModal}
                postTitle={post.translation.title}
                postId={post.id}
                onCommentAdded={handleCommentAdded}
            />
        </>
    );
}