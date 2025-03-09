import {ProjectsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const projects = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
          name: 'tools',
          type: 'array',
          of: [{ type: 'string' }], 
    }),
    defineField({
        name: 'role',
        type: 'string',
    }),
    defineField({
        name: 'demo',
        type: 'url',
        title: 'Project url'
        }),
  ],
})
