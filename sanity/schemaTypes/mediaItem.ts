import React from 'react'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'mediaItem',
    title: 'Media Item',
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
            name: 'caption',
            title: 'Caption',
            type: 'text',
            rows: 2,
            description: 'Brief description of the media',
        }),
        defineField({
            name: 'mediaType',
            title: 'Media Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' },
                    { title: 'Gallery', value: 'gallery' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image URL',
            type: 'url',
            description: 'Paste the Cloudinary image URL here',
            hidden: ({ parent }) => parent?.mediaType === 'video',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube, Vimeo, or other video URL (Direct Link)',
            hidden: ({ parent }) => parent?.mediaType !== 'video',
        }),
        defineField({
            name: 'embedCode',
            title: 'Video Embed Code',
            type: 'text',
            rows: 3,
            description: 'Paste the full iframe code from YouTube (Share -> Embed)',
            hidden: ({ parent }) => parent?.mediaType !== 'video',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Image URLs',
            type: 'array',
            of: [
                {
                    type: 'url',
                    description: 'Paste Cloudinary image URL',
                },
            ],
            hidden: ({ parent }) => parent?.mediaType !== 'gallery',
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
            name: 'relatedArticle',
            title: 'Related Article',
            type: 'reference',
            description: 'Optional: Link to a related article',
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
            media: 'image',
            mediaType: 'mediaType',
        },
        prepare(selection) {
            const { title, mediaType, media } = selection
            return {
                ...selection,
                subtitle: mediaType ? `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}` : 'Media',
                media: media ? React.createElement('img', { src: media, style: { width: '100%', height: '100%', objectFit: 'cover' } }) : undefined,
            }
        },
    },
})
