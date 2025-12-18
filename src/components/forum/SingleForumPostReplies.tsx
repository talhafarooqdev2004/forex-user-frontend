'use client';

import styles from './SingleForumPostReplies.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { commentService, CommentDTO } from '@/services/Forum/commentService';
import CommentModal from './CommentModal';
import { useAuth } from '@/contexts/AuthContext';

type SingleForumPostRepliesProps = {
    postId: number;
    postTitle?: string;
}

export default function SingleForumPostReplies({ postId, postTitle }: SingleForumPostRepliesProps) {
    const [comments, setComments] = useState<CommentDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const { user } = useAuth();

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const fetchedComments = await commentService.getCommentsByPostId(postId);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

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

    const handleCommentAdded = () => {
        fetchComments();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const getUserInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getAvatarColor = (userId: number) => {
        const colors = ['#E7003E', '#4D44B5', '#0AA1FF', '#dc2626', '#9e0000'];
        return colors[userId % colors.length];
    };

    // Convert CommentDTO to match the expected reply structure
    const convertCommentToReply = (comment: CommentDTO) => {
        const userName = comment.user 
            ? `${comment.user.firstName} ${comment.user.lastName}`
            : 'Anonymous User';
        
        return {
            id: comment.id.toString(),
            userName: userName,
            timestamp: formatDate(comment.createdAt),
            replyContent: comment.content,
            avatarSrc: comment.user 
                ? `/images/avatars/${comment.user.id}.png` // Default avatar path
                : '/images/default-avatar.png'
        };
    };

    return (
        <>
            <div className={styles['single-forum-post-replies']}>
                <div className={styles['single-forum-post-replies__replied-header']}>
                    <span>Replied ({comments.length})</span>
                </div>
                <div className={styles['single-forum-post-replies__replied-container']}>
                    <div className={styles['single-forum-post-replies__replied-list']}>
                        {isLoading ? (
                            <div className={styles['single-forum-post-replies__no-replies']}>
                                <div className={styles['single-forum-post-replies__no-replies-content']}>
                                    <p>Loading comments...</p>
                                </div>
                            </div>
                        ) : comments.length > 0 ? (
                            comments.map((comment) => {
                                const reply = convertCommentToReply(comment);
                                return (
                                    <div key={reply.id} className={styles['single-forum-reply-card']}>
                                        <div className={styles['single-forum-reply-card__avatar-wrapper']}>
                                            {comment.user ? (
                                                <div
                                                    style={{
                                                        backgroundColor: getAvatarColor(comment.user.id),
                                                        color: '#FFFFFF',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '2rem',
                                                        fontWeight: 'bold',
                                                        width: '90px',
                                                        height: '90px',
                                                        borderRadius: '50%',
                                                        border: '2px solid #ffffff'
                                                    }}
                                                >
                                                    {getUserInitials(comment.user.firstName, comment.user.lastName)}
                                                </div>
                                            ) : (
                                                <Image
                                                    src={reply.avatarSrc}
                                                    alt={`${reply.userName} avatar`}
                                                    width={90}
                                                    height={90}
                                                    className={styles['single-forum-reply-card__avatar']}
                                                />
                                            )}
                                        </div>
                                        <div className={styles['single-forum-reply-card__content']}>
                                            <div className={styles['single-forum-reply-card__header']}>
                                                <h4 className={styles['single-forum-reply-card__username']}>
                                                    {reply.userName}
                                                </h4>
                                                <span className={styles['single-forum-reply-card__timestamp']}>
                                                    {reply.timestamp}
                                                </span>
                                            </div>
                                            <p className={styles['single-forum-reply-card__reply-content']}>
                                                {reply.replyContent}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles['single-forum-post-replies__no-replies']}>
                                <div className={styles['single-forum-post-replies__no-replies-content']}>
                                    <h3>No replies yet</h3>
                                    <p>Be the first to comment on this post!</p>
                                    <button
                                        className={styles['single-forum-post-replies__first-comment-button']}
                                        onClick={handleCommentClick}
                                    >
                                        Add Comment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <CommentModal
                show={showCommentModal}
                onHide={handleCloseModal}
                postTitle={postTitle}
                postId={postId}
                onCommentAdded={handleCommentAdded}
            />
        </>
    );
} 