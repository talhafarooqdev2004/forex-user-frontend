import { cookies } from "next/headers";
import ForumClient from "./ForumClient";
import { topicService } from "@/services/Forum/topicService";
import { postService } from "@/services/Forum/postService";

export default async function Forum() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || "en";

  const topics = await topicService.getTopics(locale);

  if (!topics.length) {
    return "No topics and posts found";
  }

  const firstTopicId = topics[0].id;

  const posts = await postService.getPostsByTopicId(
    firstTopicId,
    locale
  );

  return <ForumClient
    initialtopics={topics}
    initialPosts={posts}
    initialTopicId={firstTopicId}
    initialLocale={locale}
  />
}