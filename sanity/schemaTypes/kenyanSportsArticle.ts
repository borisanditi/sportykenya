import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'kenyanSportsArticle',
    title: 'Kenyan Sports Article',
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
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sportType',
            title: 'Sport Type',
            type: 'string',
            description: 'Type of Kenyan sport',
            options: {
                list: [
                    { title: 'Athletics', value: 'athletics' },
                    { title: 'Rugby', value: 'rugby' },
                    { title: 'Football (Harambee Stars)', value: 'football' },
                    { title: 'Volleyball', value: 'volleyball' },
                    { title: 'Boxing', value: 'boxing' },
                    { title: 'Rally', value: 'rally' },
                    { title: 'Swimming', value: 'swimming' },
                    { title: 'Basketball', value: 'basketball' },
                    { title: 'Cricket', value: 'cricket' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'athleteName',
            title: 'Athlete/Team Name',
            type: 'string',
            description: 'Optional: Name of the featured athlete or team',
        }),
        defineField({
            name: 'achievement',
            title: 'Achievement/Event',
            type: 'string',
            description: 'Optional: Specific achievement or event covered',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            sportType: 'sportType',
            athleteName: 'athleteName',
        },
        prepare(selection) {
            const { author, sportType, athleteName } = selection
            return {
                ...selection,
                subtitle: `${sportType || 'Sport'} ${athleteName ? `• ${athleteName}` : ''} ${author ? `• by ${author}` : ''}`,
            }
        },
    },
})
