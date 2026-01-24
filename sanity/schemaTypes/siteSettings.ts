import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
        }),
        defineField({
            name: 'mainNavigation',
            title: 'Main Navigation',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'slug', type: 'string', title: 'Slug/URL' },
                    ],
                },
            ],
        }),
    ],
})
