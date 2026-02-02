import { BreakingNews } from "@/components/home/BreakingNews";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { LiveMatches } from "@/components/scorebat/LiveMatches";
import { EPLTable } from "@/components/scoreaxis/EPLTable";
import { client } from "@/lib/sanity";
import { BREAKING_NEWS_QUERY, HERO_STORIES_QUERY, NEWS_GRID_QUERY } from "@/lib/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [breakingNews, heroStories, gridPosts] = await Promise.all([
    client.fetch(BREAKING_NEWS_QUERY),
    client.fetch(HERO_STORIES_QUERY),
    client.fetch(NEWS_GRID_QUERY),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <BreakingNews news={breakingNews} />
      <HeroSection stories={heroStories} />
      <LiveMatches />
      <NewsGrid posts={gridPosts} />
      <EPLTable />
    </div>
  );
}
