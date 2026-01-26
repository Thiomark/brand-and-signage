import type { CollectionConfig } from 'payload'
import { revalidateCollectionAfterChange } from '@/lib/revalidate'

export const GalleryCategories: CollectionConfig = {
  slug: 'gallery-categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
