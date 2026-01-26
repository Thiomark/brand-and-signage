import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook, CollectionAfterChangeHook } from 'payload'

// Map global slugs to their frontend paths
const globalPathMap: Record<string, string> = {
  'home-page': '/',
  'about-page': '/about',
  'contact-page': '/contact',
  'site-settings': '/', // site settings affect all pages via layout
}

// Map collection slugs to their frontend paths
const collectionPathMap: Record<string, string> = {
  services: '/services',
  'gallery-items': '/gallery',
  'gallery-categories': '/gallery',
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ global }) => {
  const path = globalPathMap[global.slug]
  if (path) {
    revalidatePath(path)
    // Also revalidate layout for site-settings since it affects the whole site
    if (global.slug === 'site-settings') {
      revalidatePath('/', 'layout')
    }
  }
}

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = ({ collection }) => {
  const slug = typeof collection === 'string' ? collection : collection.slug
  const path = collectionPathMap[slug]
  if (path) {
    revalidatePath(path)
  }
}
