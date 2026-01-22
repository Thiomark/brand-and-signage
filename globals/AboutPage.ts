import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
      defaultValue: 'About Us',
    },
    {
      name: 'pageSubtitle',
      type: 'text',
      defaultValue: 'Your trusted partner for all printing and signage needs.',
    },
    {
      name: 'storyTitle',
      type: 'text',
      defaultValue: 'Our Story',
    },
    {
      name: 'storyParagraphs',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          text: 'Brand and Signage was founded with a simple mission: to help businesses and individuals bring their visual identity to life through high-quality printing and signage solutions.',
        },
        {
          text: "With years of experience in the industry, we've built a reputation for delivering exceptional results, fast turnaround times, and outstanding customer service.",
        },
        {
          text: 'Whether you need a single business card or a complete branding package, we treat every project with the same level of care and attention to detail.',
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        {
          name: 'yearsExperience',
          type: 'text',
          defaultValue: '10+',
        },
        {
          name: 'yearsLabel',
          type: 'text',
          defaultValue: 'Years of Experience',
        },
        {
          name: 'projectsCompleted',
          type: 'text',
          defaultValue: '5000+',
        },
        {
          name: 'projectsLabel',
          type: 'text',
          defaultValue: 'Projects Completed',
        },
        {
          name: 'happyClients',
          type: 'text',
          defaultValue: '1000+',
        },
        {
          name: 'clientsLabel',
          type: 'text',
          defaultValue: 'Happy Clients',
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Quality Badge', value: 'quality' },
            { label: 'Clock', value: 'clock' },
            { label: 'People', value: 'people' },
          ],
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Quality First',
          description: 'We use premium materials and state-of-the-art equipment to ensure every product meets the highest standards.',
          icon: 'quality',
        },
        {
          title: 'Fast Turnaround',
          description: 'We understand deadlines matter. Our efficient processes ensure quick delivery without compromising quality.',
          icon: 'clock',
        },
        {
          title: 'Customer Focus',
          description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.',
          icon: 'people',
        },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      defaultValue: 'Ready to Work Together?',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: "Let's discuss your project and see how we can help bring your vision to life.",
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      defaultValue: 'Contact Us Today',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
}
