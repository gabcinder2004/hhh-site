import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guildInfo',
  title: 'Guild Info',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'discordLink',
      title: 'Discord Link',
      type: 'url',
    }),
    defineField({
      name: 'officers',
      title: 'Officers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
})
