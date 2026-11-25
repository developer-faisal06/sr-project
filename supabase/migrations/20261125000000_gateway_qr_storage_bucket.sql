-- ============================================================
-- SR Investment: Create storage bucket for payment gateway QR codes
-- ============================================================

-- 1. Create the gateway-qr bucket (public so QR images are accessible without auth)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gateway-qr',
  'gateway-qr',
  true,
  2097152,  -- 2 MB max
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update
set public = true,
    file_size_limit = 2097152,
    allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

-- 2. RLS policies for gateway-qr bucket
-- Allow anyone to read (public QR codes for users)
drop policy if exists "Public read gateway-qr" on storage.objects;
create policy "Public read gateway-qr" on storage.objects
  for select using (bucket_id = 'gateway-qr');

-- Allow authenticated users to upload/update/delete (admin operations)
drop policy if exists "Auth manage gateway-qr" on storage.objects;
create policy "Auth manage gateway-qr" on storage.objects
  for all using (bucket_id = 'gateway-qr') with check (bucket_id = 'gateway-qr');
