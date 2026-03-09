
-- Create eidi_profiles table
CREATE TABLE public.eidi_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT DEFAULT '',
  message TEXT DEFAULT '',
  payment_number TEXT DEFAULT '',
  visits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.eidi_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles" ON public.eidi_profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can create profiles" ON public.eidi_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update visits" ON public.eidi_profiles FOR UPDATE USING (true);

-- Create secret_messages table
CREATE TABLE public.secret_messages (
  id TEXT PRIMARY KEY,
  sender_name TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.secret_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view secret messages" ON public.secret_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can create secret messages" ON public.secret_messages FOR INSERT WITH CHECK (true);

-- Create voice_wishes table
CREATE TABLE public.voice_wishes (
  id TEXT PRIMARY KEY,
  sender_name TEXT NOT NULL DEFAULT '',
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.voice_wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view voice wishes" ON public.voice_wishes FOR SELECT USING (true);
CREATE POLICY "Anyone can create voice wishes" ON public.voice_wishes FOR INSERT WITH CHECK (true);

-- Create storage bucket for voice recordings
INSERT INTO storage.buckets (id, name, public) VALUES ('voice-wishes', 'voice-wishes', true);

CREATE POLICY "Anyone can upload voice wishes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'voice-wishes');
CREATE POLICY "Anyone can view voice wishes" ON storage.objects FOR SELECT USING (bucket_id = 'voice-wishes');
