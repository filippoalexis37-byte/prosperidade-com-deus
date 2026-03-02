
-- Table for daily verses
CREATE TABLE public.daily_verses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  verse_date DATE NOT NULL DEFAULT CURRENT_DATE UNIQUE,
  verse_text TEXT NOT NULL,
  verse_reference TEXT NOT NULL,
  background_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.daily_verses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved users can view verses"
  ON public.daily_verses FOR SELECT
  USING (is_approved(auth.uid()));

CREATE POLICY "Admins can manage verses"
  ON public.daily_verses FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Table for user favorites
CREATE TABLE public.verse_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  verse_id UUID NOT NULL REFERENCES public.daily_verses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, verse_id)
);

ALTER TABLE public.verse_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON public.verse_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON public.verse_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.verse_favorites FOR DELETE
  USING (auth.uid() = user_id);
