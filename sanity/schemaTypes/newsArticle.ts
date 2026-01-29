import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'newsArticle',
    title: 'News Article',
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
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
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
            name: 'showOnGrid',
            title: 'Show on Homepage Grid',
            type: 'boolean',
            description: 'Display this article in the homepage news grid',
            initialValue: true,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            showOnGrid: 'showOnGrid',
        },
        prepare(selection) {
            const { author, showOnGrid } = selection
            return {
                ...selection,
                subtitle: `${author ? `by ${author}` : 'No author'}${showOnGrid ? ' • On Grid' : ''}`,
            }
        },
    },
})
