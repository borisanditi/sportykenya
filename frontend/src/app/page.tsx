import { BreakingNews } from "@/components/home/BreakingNews";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { Scoreboard } from "@/components/home/Scoreboard";
import { LiveMatches } from "@/components/scorebat/LiveMatches";
import { PremierLeagueTable } from "@/components/scorebat/PremierLeagueTable";
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
      <Scoreboard />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <LiveMatches />
          <NewsGrid posts={gridPosts} />
        </div>
        <div className="space-y-8">
          <PremierLeagueTable />
          {/* Additional sidebar content can go here */}
        </div>
      </div>
    </div>
  );
}
