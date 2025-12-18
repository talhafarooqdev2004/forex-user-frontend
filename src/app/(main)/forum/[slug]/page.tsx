import { cookies } from 'next/headers';
import PostClient from './PostClient';
import { postService } from '@/services/Forum/postService';
import { topicService } from '@/services/Forum/topicService';

export default async function ForumPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value || process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

    const topics = await topicService.getTopics(locale);
    const post = await postService.getPostBySlug(slug, locale);

    if (!post) {
        throw new Error('Post Not Found!');
    }

    return <PostClient initialTopics={topics} initialPost={post} slug={slug} />;
}