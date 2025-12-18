"use client";

import { useState } from 'react';
import ForumCategoryFilters from './ForumCategoryFilters';
import SingleForumPostCard from './SingleForumPostCard';
import SingleForumPostReplies from './SingleForumPostReplies';
import { PostDTO } from '@/types/results/PostsIndexResultDTO';
import useTopics from '@/hooks/useTopics';
import { TopicDTO } from '@/types/results/TopicsIndexResultDTO';

type SingleForumPostLayoutProps = {
    initialTopics: TopicDTO[];
    initialPost: PostDTO;
    slug: string;
}

export default function SingleForumPostLayout({ initialPost, initialTopics, slug }: SingleForumPostLayoutProps) {
    const [refreshComments, setRefreshComments] = useState(0);

    const { topics } = useTopics({
        fallbackData: initialTopics,
    });

    // Find the topic ID from the post (assuming post has topic_id or we can get it from the topic name)
    // Since PostDTO doesn't seem to have topic_id directly, we'll use the first topic as default
    // or find the matching topic by name
    const getPostTopicId = () => {
        if (initialPost.topic) {
            const matchingTopic = topics?.find(t => t.translation?.title === initialPost.topic);
            if (matchingTopic) {
                return matchingTopic.id;
            }
        }
        return topics?.[0]?.id || 1;
    };

    const handleCommentAdded = () => {
        setRefreshComments(prev => prev + 1);
    };

    return (
        <>
            <ForumCategoryFilters
                topics={topics}
                activeTopicId={getPostTopicId()}
                navigateToForum={true}
            />
            <SingleForumPostCard post={initialPost} onCommentAdded={handleCommentAdded} />
            <SingleForumPostReplies postId={initialPost.id} postTitle={initialPost.translation.title} key={refreshComments} />
        </>
    );
}