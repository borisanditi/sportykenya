import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footballArticle',
    title: 'Football Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image URL',
            type: 'url',
            description: 'Paste the Cloudinary image URL here',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'object',
                    name: 'cloudinaryImage',
                    title: 'Cloudinary Image',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'Image URL',
                            description: 'Paste the Cloudinary image URL here',
                        },
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'league',
            title: 'League',
            type: 'string',
            description: 'e.g., Premier League, La Liga, Champions League',
            options: {
                list: [
                    { title: 'Premier League', value: 'premier-league' },
                    { title: 'La Liga', value: 'la-liga' },
                    { title: 'Serie A', value: 'serie-a' },
                    { title: 'Bundesliga', value: 'bundesliga' },
                    { title: 'Ligue 1', value: 'ligue-1' },
                    { title: 'Champions League', value: 'champions-league' },
                    { title: 'Europa League', value: 'europa-league' },
                    { title: 'African Competitions', value: 'african' },
                    { title: 'Kenyan Premier League', value: 'kenyan-premier-league' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'matchRelated',
            title: 'Match Related',
            type: 'object',
            description: 'Optional: If this article is about a specific match',
            fields: [
                {
                    name: 'homeTeam',
                    title: 'Home Team',
                    type: 'string',
                },
                {
                    name: 'awayTeam',
                    title: 'Away Team',
                    type: 'string',
                },
                {
                    name: 'matchDate',
                    title: 'Match Date',
                    type: 'datetime',
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            league: 'league',
        },
        prepare(selection) {
            const { author, league } = selection
            return {
                ...selection,
                subtitle: `${author ? `by ${author}` : 'No author'}${league ? ` • ${league}` : ''}`,
            }
        },
    },
})
