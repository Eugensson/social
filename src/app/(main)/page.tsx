import { ForYouFeed } from "@/app/(main)/for-you-feed";
import { TrendsSidebar } from "@/components/trends-sidebar";
import { PostEditor } from "@/components/posts/editor/post-editor";

const Home = () => {
  return (
    <div className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </div>
  )
}

export default Home;