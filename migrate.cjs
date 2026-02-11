/**
 * Standalone migration runner - run with: node migrate.cjs
 * Applies the initial database schema to your PostgreSQL database.
 * Requires DATABASE_URL environment variable to be set.
 */
const { Pool } = require('pg')

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set')
  process.exit(1)
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const statements = [
  // Enum types
  `CREATE TYPE "enum_services_icon" AS ENUM('printer', 'sticker', 'building')`,
  `CREATE TYPE "enum_home_page_service_cards_icon" AS ENUM('printer', 'sticker', 'building')`,
  `CREATE TYPE "enum_home_page_service_cards_variant" AS ENUM('blue', 'pink')`,
  `CREATE TYPE "enum_about_page_values_icon" AS ENUM('quality', 'clock', 'people')`,

  // Users (auth collection)
  `CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  )`,
  `CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at")`,
  `CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at")`,
  `CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email")`,

  // Media (upload collection)
  `CREATE TABLE "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "caption" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_card_url" varchar,
    "sizes_card_width" numeric,
    "sizes_card_height" numeric,
    "sizes_card_mime_type" varchar,
    "sizes_card_filesize" numeric,
    "sizes_card_filename" varchar,
    "sizes_tablet_url" varchar,
    "sizes_tablet_width" numeric,
    "sizes_tablet_height" numeric,
    "sizes_tablet_mime_type" varchar,
    "sizes_tablet_filesize" numeric,
    "sizes_tablet_filename" varchar
  )`,
  `CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at")`,
  `CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at")`,
  `CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename")`,

  // Pages
  `CREATE TABLE "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "content" jsonb,
    "meta_description" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug")`,
  `CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at")`,
  `CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at")`,

  // Gallery Categories
  `CREATE TABLE "gallery_categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX "gallery_categories_updated_at_idx" ON "gallery_categories" USING btree ("updated_at")`,
  `CREATE INDEX "gallery_categories_created_at_idx" ON "gallery_categories" USING btree ("created_at")`,

  // Services
  `CREATE TABLE "services" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "icon" "enum_services_icon" NOT NULL,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at")`,
  `CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at")`,

  // Services - features array
  `CREATE TABLE "services_features" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "feature" varchar NOT NULL
  )`,
  `CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order")`,
  `CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id")`,
  `ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Gallery Items
  `CREATE TABLE "gallery_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "category_id" integer NOT NULL,
    "image_id" integer NOT NULL,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX "gallery_items_category_idx" ON "gallery_items" USING btree ("category_id")`,
  `CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id")`,
  `CREATE INDEX "gallery_items_updated_at_idx" ON "gallery_items" USING btree ("updated_at")`,
  `CREATE INDEX "gallery_items_created_at_idx" ON "gallery_items" USING btree ("created_at")`,
  `ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "gallery_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
  `ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,

  // Site Settings (global)
  `CREATE TABLE "site_settings" (
    "id" serial PRIMARY KEY NOT NULL,
    "site_name" varchar NOT NULL,
    "site_tagline" varchar,
    "logo_image_id" integer,
    "logo_url" varchar,
    "social_links_facebook" varchar,
    "social_links_twitter" varchar,
    "social_links_instagram" varchar,
    "footer_text" varchar,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  )`,
  `ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_image_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,

  // Site Settings - nav_links array
  `CREATE TABLE "site_settings_nav_links" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "label" varchar NOT NULL,
    "href" varchar NOT NULL
  )`,
  `CREATE INDEX "site_settings_nav_links_order_idx" ON "site_settings_nav_links" USING btree ("_order")`,
  `CREATE INDEX "site_settings_nav_links_parent_id_idx" ON "site_settings_nav_links" USING btree ("_parent_id")`,
  `ALTER TABLE "site_settings_nav_links" ADD CONSTRAINT "site_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site_settings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Home Page (global)
  `CREATE TABLE "home_page" (
    "id" serial PRIMARY KEY NOT NULL,
    "headline" varchar NOT NULL,
    "subheadline" varchar,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  )`,

  // Home Page - hero_images array
  `CREATE TABLE "home_page_hero_images" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "image_id" integer NOT NULL
  )`,
  `CREATE INDEX "home_page_hero_images_order_idx" ON "home_page_hero_images" USING btree ("_order")`,
  `CREATE INDEX "home_page_hero_images_parent_id_idx" ON "home_page_hero_images" USING btree ("_parent_id")`,
  `ALTER TABLE "home_page_hero_images" ADD CONSTRAINT "home_page_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "home_page_hero_images" ADD CONSTRAINT "home_page_hero_images_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,

  // Home Page - service_cards array
  `CREATE TABLE "home_page_service_cards" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "icon" "enum_home_page_service_cards_icon" NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "variant" "enum_home_page_service_cards_variant" DEFAULT 'blue'
  )`,
  `CREATE INDEX "home_page_service_cards_order_idx" ON "home_page_service_cards" USING btree ("_order")`,
  `CREATE INDEX "home_page_service_cards_parent_id_idx" ON "home_page_service_cards" USING btree ("_parent_id")`,
  `ALTER TABLE "home_page_service_cards" ADD CONSTRAINT "home_page_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "home_page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // About Page (global)
  `CREATE TABLE "about_page" (
    "id" serial PRIMARY KEY NOT NULL,
    "page_title" varchar NOT NULL,
    "page_subtitle" varchar,
    "story_title" varchar,
    "stats_years_experience" varchar,
    "stats_years_label" varchar,
    "stats_projects_completed" varchar,
    "stats_projects_label" varchar,
    "stats_happy_clients" varchar,
    "stats_clients_label" varchar,
    "cta_title" varchar,
    "cta_text" varchar,
    "cta_button_text" varchar,
    "cta_button_link" varchar,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  )`,

  // About Page - story_paragraphs array
  `CREATE TABLE "about_page_story_paragraphs" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "text" varchar NOT NULL
  )`,
  `CREATE INDEX "about_page_story_paragraphs_order_idx" ON "about_page_story_paragraphs" USING btree ("_order")`,
  `CREATE INDEX "about_page_story_paragraphs_parent_id_idx" ON "about_page_story_paragraphs" USING btree ("_parent_id")`,
  `ALTER TABLE "about_page_story_paragraphs" ADD CONSTRAINT "about_page_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "about_page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // About Page - values array
  `CREATE TABLE "about_page_values" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar NOT NULL,
    "icon" "enum_about_page_values_icon" NOT NULL
  )`,
  `CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order")`,
  `CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id")`,
  `ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "about_page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Contact Page (global)
  `CREATE TABLE "contact_page" (
    "id" serial PRIMARY KEY NOT NULL,
    "page_title" varchar NOT NULL,
    "page_subtitle" varchar,
    "form_title" varchar,
    "contact_info_title" varchar,
    "address_street" varchar,
    "address_city" varchar,
    "address_country" varchar,
    "phone" varchar,
    "email" varchar,
    "business_hours_title" varchar,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  )`,

  // Contact Page - business_hours array
  `CREATE TABLE "contact_page_business_hours" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "days" varchar NOT NULL,
    "hours" varchar NOT NULL,
    "is_closed" boolean DEFAULT false
  )`,
  `CREATE INDEX "contact_page_business_hours_order_idx" ON "contact_page_business_hours" USING btree ("_order")`,
  `CREATE INDEX "contact_page_business_hours_parent_id_idx" ON "contact_page_business_hours" USING btree ("_parent_id")`,
  `ALTER TABLE "contact_page_business_hours" ADD CONSTRAINT "contact_page_business_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "contact_page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Contact Page - service_options array
  `CREATE TABLE "contact_page_service_options" (
    "id" serial PRIMARY KEY NOT NULL,
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "value" varchar NOT NULL,
    "label" varchar NOT NULL
  )`,
  `CREATE INDEX "contact_page_service_options_order_idx" ON "contact_page_service_options" USING btree ("_order")`,
  `CREATE INDEX "contact_page_service_options_parent_id_idx" ON "contact_page_service_options" USING btree ("_parent_id")`,
  `ALTER TABLE "contact_page_service_options" ADD CONSTRAINT "contact_page_service_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "contact_page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Payload internal: locked documents
  `CREATE TABLE "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug")`,
  `CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at")`,
  `CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at")`,

  // Payload internal: locked documents rels
  `CREATE TABLE "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "media_id" integer,
    "pages_id" integer,
    "services_id" integer,
    "gallery_items_id" integer,
    "gallery_categories_id" integer
  )`,
  `CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order")`,
  `CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id")`,
  `CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path")`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_items_fk" FOREIGN KEY ("gallery_items_id") REFERENCES "gallery_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_categories_fk" FOREIGN KEY ("gallery_categories_id") REFERENCES "gallery_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Payload internal: preferences
  `CREATE TABLE "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key")`,
  `CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at")`,
  `CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at")`,

  // Payload internal: preferences rels
  `CREATE TABLE "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  )`,
  `CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order")`,
  `CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id")`,
  `CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path")`,
  `ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,

  // Payload internal: migrations tracking
  `CREATE TABLE "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at")`,
  `CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at")`,

  // Record this migration as applied
  `INSERT INTO "payload_migrations" ("name", "batch") VALUES ('20260211_000000_initial', 1)`,
]

async function run() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    let completed = 0
    for (const stmt of statements) {
      await client.query(stmt)
      completed++
    }

    await client.query('COMMIT')
    console.log(`Migration complete: ${completed} statements executed successfully.`)
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Migration failed, rolled back:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

run()
