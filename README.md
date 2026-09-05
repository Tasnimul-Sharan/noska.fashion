# Noska Fashion

Next.js Pages Router storefront with Vercel ISR and a Supabase Postgres catalog.
When `DATABASE_URL` is absent or the database is unavailable, the storefront keeps
working with the catalog in `src/data/products.jsx`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project in the same or nearest region to the Vercel functions.
2. Open Supabase SQL Editor and run `supabase/migrations/001_catalog.sql`.
3. In the Supabase dashboard, click **Connect** and select **Transaction pooler**.
4. Copy the connection string that uses port `6543`. Its username includes the
   project reference, for example `postgres.PROJECT_REF`.
5. URL-encode special characters in the database password before placing it in the URL.
6. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and a long random
   `REVALIDATION_SECRET`.
7. Add both variables in Vercel Project Settings > Environment Variables for
   Production and Preview, then redeploy.

The runtime connection must look like this:

```text
postgresql://postgres.PROJECT_REF:URL_ENCODED_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres
```

Do not expose `DATABASE_URL` through a `NEXT_PUBLIC_` variable. Port `6543` is for
short-lived Vercel/serverless traffic. The database client disables prepared
statements because Supabase transaction mode does not support them.

## Import the current catalog

After the schema and Vercel variables are ready, import the products currently in
the local catalog with one protected request:

```bash
curl -X POST https://YOUR_DOMAIN/api/admin/seed-catalog \
  -H "Authorization: Bearer YOUR_REVALIDATION_SECRET"
```

The import is idempotent: it upserts collections and products, then refreshes the
main catalog and collection ISR pages. Product detail pages refresh automatically
within five minutes, or they can be refreshed immediately with the revalidation
endpoint below. Remove or disable this route after the real admin panel becomes the
only catalog writer.

## ISR and cache behavior

The home, shop, collections, collection detail, and product detail pages use ISR.
Cached HTML is served to visitors and is eligible for background regeneration every
300 seconds. New product and collection slugs use `fallback: "blocking"`, so adding
a product does not require rebuilding the full site.

After an admin update, refresh selected pages immediately:

```bash
curl -X POST https://YOUR_DOMAIN/api/revalidate-catalog \
  -H "Authorization: Bearer YOUR_REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/shop","/collections/eid-edit","/products/example-slug"]}'
```

ISR is suitable for catalog content, product descriptions, prices, and display-only
stock snapshots. A real checkout API must always re-read variant stock and price
inside a database transaction before creating an order. Never trust cached stock or
prices sent by the browser.

Connection pooling and ISR reduce database load, but they do not guarantee a fixed
visitor count. Actual capacity depends on cache-hit rate, page weight, Vercel limits,
Supabase egress/compute, authenticated usage, and how many uncached API calls each
visit creates.
