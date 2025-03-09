export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Skill Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Skill Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
      },
    ],
  };
  