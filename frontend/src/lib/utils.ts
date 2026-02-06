import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Force update for Vercel

export function getArticleHref(article: { _type?: string; slug: { current: string }; linkedArticle?: { _type: string; slug: { current: string } } }) {
    if (article.linkedArticle) {
        const type = article.linkedArticle._type;
        const slug = article.linkedArticle.slug.current;
        if (type === 'footballArticle') return `/football/${slug}`;
        if (type === 'kenyanSportsArticle') return `/kenyan-sports/${slug}`;
        return `/news/${slug}`;
    }

    const type = article._type;
    const slug = article.slug.current;
    if (type === 'footballArticle') return `/football/${slug}`;
    if (type === 'kenyanSportsArticle') return `/kenyan-sports/${slug}`;
    return `/news/${slug}`;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
