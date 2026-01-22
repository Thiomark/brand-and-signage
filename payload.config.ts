import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudinaryPlugin } from '@jhb.software/payload-cloudinary-plugin'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { GalleryItems } from './collections/GalleryItems'
import { GalleryCategories } from './collections/GalleryCategories'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Services, GalleryItems, GalleryCategories],
  globals: [SiteSettings, HomePage, AboutPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-super-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Note: Run `pnpm dev` in terminal to handle schema migrations interactively
    // Schema changes require interactive prompts that cannot be handled in background
    push: true,
  }),
  plugins: [
    payloadCloudinaryPlugin({
      collections: {
        media: true,
      },
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      credentials: {
        apiKey: process.env.CLOUDINARY_API_KEY!,
        apiSecret: process.env.CLOUDINARY_API_SECRET!,
      },
      folder: 'brand-and-signage',
      clientUploads: true,
      useFilename: true,
    }),
  ],
  sharp,
})
