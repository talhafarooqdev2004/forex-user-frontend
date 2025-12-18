'use client';

import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './CommentModal.module.scss';
import { useTranslations } from 'next-intl';
import { FaTimes } from 'react-icons/fa';
import { axiosInstance } from '@/lib/config';
import { API_ENDPOINTS } from '@/lib/config';
import { useAuth } from '@/contexts/AuthContext';

interface CommentModalProps {
    show: boolean;
    onHide: () => void;
    postTitle?: string;
    postId: number;
    onCommentAdded?: () => void;
}

const CommentModal = ({ show, onHide, postTitle, postId, onCommentAdded }: CommentModalProps) => {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const t = useTranslations('forum');
    const { user } = useAuth();

    const handleSubmitComment = async () => {
        if (!comment.trim()) {
            setError('Please enter a comment');
            return;
        }

        if (!user) {
            setError('Please login to comment');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await axiosInstance.post(API_ENDPOINTS.FORUM.COMMENTS, {
                postId,
                content: comment.trim()
            });

            setComment('');
            onHide();
            
            // Callback to refresh comments if provided
            if (onCommentAdded) {
                onCommentAdded();
            }
        } catch (err: any) {
            console.error('Error submitting comment:', err);
            if (err.response?.status === 401) {
                setError('Please login to comment');
            } else {
                setError(err.response?.data?.message || 'Failed to submit comment. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop={true}
            dialogClassName={styles.modalDialog}
        >
            <div className={styles.modalContent}>
                <button
                    className={styles.closeButton}
                    onClick={onHide}
                >
                    <FaTimes />
                </button>

                <h2 className={styles.modalHeader}>
                    {t('commentModal.title')}
                </h2>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <Form>
                    <Form.Group className={styles.formGroup}>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            value={comment}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setComment(e.target.value);
                                setError(null);
                            }}
                            placeholder={t('commentModal.placeholder')}
                            className={styles.formTextarea}
                            disabled={isSubmitting}
                        />
                    </Form.Group>

                    <Button
                        className={styles.saveButton}
                        onClick={handleSubmitComment}
                        disabled={isSubmitting || !comment.trim()}
                    >
                        {isSubmitting ? 'Submitting...' : t('commentModal.save')}
                    </Button>
                </Form>
            </div>
        </Modal>
    );
};

export default CommentModal;
