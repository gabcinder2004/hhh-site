import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'raid',
  title: 'Raid',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower number = more current',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bosses',
      title: 'Bosses',
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
              name: 'killed',
              title: 'Killed',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'killDate',
              title: 'Kill Date',
              type: 'date',
            }),
            defineField({
              name: 'killScreenshot',
              title: 'Kill Screenshot',
              type: 'image',
            }),
          ],
        },
      ],
    }),
  ],
})
