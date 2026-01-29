import { groq } from 'next-sanity';

// Breaking News for the ticker
export const BREAKING_NEWS_QUERY = groq`*[_type == "breakingNews"] | order(publishedAt desc)[0...10] {
  _id,
  title,
  slug,
  publishedAt,
  "articleSlug": linkedArticle->slug.current,
  "articleType": linkedArticle->_type,
  externalLink
}`;

// Hero Stories for the hero section
export const HERO_STORIES_QUERY = groq`*[_type == "heroStory"] | order(priority asc, publishedAt desc)[0...4] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  priority,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  },
  "linkedArticle": linkedArticle->{
    slug,
    _type
  }
}`;

// News Articles for the homepage grid (only those with showOnGrid=true)
export const NEWS_GRID_QUERY = groq`*[_type == "newsArticle" && showOnGrid == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

// All News Articles (for news page)
export const ALL_NEWS_QUERY = groq`*[_type == "newsArticle"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

// Football Articles
export const FOOTBALL_ARTICLES_QUERY = groq`*[_type == "footballArticle"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  league,
  matchRelated,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

// Kenyan Sports Articles
export const KENYAN_SPORTS_QUERY = groq`*[_type == "kenyanSportsArticle"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  sportType,
  athleteName,
  achievement,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

// Media Items
export const MEDIA_ITEMS_QUERY = groq`*[_type == "mediaItem"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  caption,
  mediaType,
  image,
  videoUrl,
  gallery,
  publishedAt,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "relatedArticle": relatedArticle->{
    slug,
    _type,
    title
  }
}`;

// Single Article Query (for detail pages)
export const ARTICLE_BY_SLUG_QUERY = groq`*[
  _type in ["newsArticle", "footballArticle", "kenyanSportsArticle"] && 
  slug.current == $slug
][0] {
  _id,
  _type,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  body,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  },
  // Football-specific fields
  league,
  matchRelated,
  // Kenyan sports-specific fields
  sportType,
  athleteName,
  achievement
}`;

// Articles by Category
export const ARTICLES_BY_CATEGORY_QUERY = groq`*[
  _type in ["newsArticle", "footballArticle", "kenyanSportsArticle"] && 
  references(*[_type == "category" && slug.current == $categorySlug]._id)
] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "categories": categories[]->{
    title,
    slug,
    color
  },
  "author": author->{
    name,
    image
  }
}`;

// Site Settings
export const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  title,
  description,
  mainNavigation,
  footerNavigation
}`;
