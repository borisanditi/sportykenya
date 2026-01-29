import React from 'react'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'heroStory',
    title: 'Hero Story',
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
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Brief description for the hero card',
            validation: (Rule) => Rule.required().max(200),
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
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'priority',
            title: 'Priority',
            type: 'number',
            description: 'Lower number = higher priority (1 = top story)',
            validation: (Rule) => Rule.required().min(1).max(10),
            initialValue: 5,
        }),
        defineField({
            name: 'linkedArticle',
            title: 'Linked Article',
            type: 'reference',
            description: 'Link to the full article',
            to: [
                { type: 'newsArticle' },
                { type: 'footballArticle' },
                { type: 'kenyanSportsArticle' },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            priority: 'priority',
        },
        prepare(selection) {
            const { title, priority, media } = selection
            return {
                ...selection,
                subtitle: `Priority: ${priority}`,
                media: media ? React.createElement('img', { src: media, style: { width: '100%', height: '100%', objectFit: 'cover' } }) : undefined,
            }
        },
    },
})
