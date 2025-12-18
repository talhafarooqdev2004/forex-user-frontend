import PageWithHeroLayout from "@/components/layouts/PageWithHeroLayout";
import SingleForumPostLayout from "@/components/forum/SingleForumPostLayout";
import { PostDTO } from "@/types/results/PostsIndexResultDTO";
import { TopicDTO } from "@/types/results/TopicsIndexResultDTO";

interface PostClientProps {
    initialTopics: TopicDTO[],
    initialPost: PostDTO,
    slug: string;
};

export default function PostClient({ initialPost, initialTopics, slug }: PostClientProps) {

    return (
        <PageWithHeroLayout alignItems="flex-start" stickyAside={true}>
            <SingleForumPostLayout initialPost={initialPost} initialTopics={initialTopics} slug={slug} />
        </PageWithHeroLayout>
    );
}