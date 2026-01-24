import { BreakingNews } from "@/components/home/BreakingNews";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { Scoreboard } from "@/components/home/Scoreboard";
import { LiveScores } from "@/components/sports/LiveScores";
import { FootballDashboard } from "@/components/sports/FootballDashboard";
import { client } from "@/lib/sanity";
import { BREAKING_NEWS_QUERY, POSTS_QUERY } from "@/lib/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [breakingNews, posts] = await Promise.all([
    client.fetch(BREAKING_NEWS_QUERY),
    client.fetch(POSTS_QUERY),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <BreakingNews news={breakingNews} />
      <HeroSection />
      <Scoreboard />
      <LiveScores />
      <FootballDashboard apiKey={process.env.API_FOOTBALL_KEY} />
      <NewsGrid posts={posts} />
    </div>
  );
}
