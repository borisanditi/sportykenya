import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
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

export const BREAKING_NEWS_QUERY = groq`*[_type == "post" && isBreaking == true] | order(publishedAt desc) {
  _id,
  title,
  slug
}`;

export const HERO_QUERY = groq`*[_type == "post" && isFeatured == true] | order(publishedAt desc)[0...4] {
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

export const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  title,
  description,
  mainNavigation,
  footerNavigation
}`;
