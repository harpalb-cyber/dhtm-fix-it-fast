ALTER TABLE public.enquiries ADD COLUMN photo_paths text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_photo_paths_max CHECK (coalesce(array_length(photo_paths,1),0) <= 6);
CREATE POLICY "Anyone can upload enquiry photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'enquiry-photos' AND (storage.foldername(name))[1] = 'sell');