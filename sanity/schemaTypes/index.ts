import category from './category'
import author from './author'
import siteSettings from './siteSettings'
import breakingNews from './breakingNews'
import heroStory from './heroStory'
import newsArticle from './newsArticle'
import footballArticle from './footballArticle'
import kenyanSportsArticle from './kenyanSportsArticle'
import mediaItem from './mediaItem'

export const schemaTypes = [
    // Settings
    siteSettings,

    // Core content types
    breakingNews,
    heroStory,
    newsArticle,
    footballArticle,
    kenyanSportsArticle,
    mediaItem,

    // Supporting types
    author,
    category,
]
