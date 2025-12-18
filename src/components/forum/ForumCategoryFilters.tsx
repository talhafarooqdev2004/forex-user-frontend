import { TopicDTO } from '@/types/results/TopicsIndexResultDTO';
import styles from './ForumCategoryFilters.module.scss';
import { useRouter } from 'next/navigation';

type ForumCategoryFiltersProps = {
    topics: TopicDTO[] | [];
    activeTopicId: number;
    onTopicChange?: (topicId: number) => void;
    navigateToForum?: boolean;
}

export default function ForumCategoryFilters({
    topics,
    activeTopicId,
    onTopicChange,
    navigateToForum = false
}: ForumCategoryFiltersProps) {
    const router = useRouter();

    const handleTopicClick = (topicId: number) => {
        if (topicId === activeTopicId) {
            return; // Don't do anything if clicking the same topic
        }

        if (navigateToForum) {
            // Navigate to forum page with topic filter
            router.push(`/forum?topicId=${topicId}`);
        } else if (onTopicChange) {
            // Call the callback if provided
            onTopicChange(topicId);
        }
    };

    return (
        <div className={styles['forum-category-filters']}>

            <div className={styles['forum-category-filters__row']}>
                {topics?.map((topic) => (
                    <button
                        key={topic.id}
                        className={`${styles['forum-category-filters__button']} ${activeTopicId === topic.id ? styles['forum-category-filters__button--active'] : ''
                            }`}
                        onClick={() => handleTopicClick(topic.id)}
                    >
                        <span>{topic.translation.title}</span>
                    </button>
                ))}
            </div>

        </div>
    );
} 