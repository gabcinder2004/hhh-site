import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'characterName',
      title: 'Character Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'realm',
      title: 'Realm',
      type: 'string',
      initialValue: 'Ambershire',
    }),
    defineField({
      name: 'guildRank',
      title: 'Guild Rank',
      type: 'string',
      options: {
        list: [
          { title: 'Guild Master', value: 'gm' },
          { title: 'Officer', value: 'officer' },
          { title: 'Raider', value: 'raider' },
          { title: 'Member', value: 'member' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Tank', value: 'tank' },
          { title: 'Healer', value: 'healer' },
          { title: 'DPS', value: 'dps' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
  ],
})
