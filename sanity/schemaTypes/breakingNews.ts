import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'breakingNews',
    title: 'Breaking News',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Breaking news headline (keep it concise for the ticker)',
            validation: (Rule) => Rule.required().max(120),
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
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'linkedArticle',
            title: 'Linked Article',
            type: 'reference',
            description: 'Optional: Link to a full news article',
            to: [
                { type: 'newsArticle' },
                { type: 'footballArticle' },
                { type: 'kenyanSportsArticle' },
            ],
        }),
        defineField({
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
            description: 'Optional: Link to external source (if no linked article)',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt',
        },
        prepare(selection) {
            const { title, publishedAt } = selection
            return {
                title,
                subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date',
            }
        },
    },
})
