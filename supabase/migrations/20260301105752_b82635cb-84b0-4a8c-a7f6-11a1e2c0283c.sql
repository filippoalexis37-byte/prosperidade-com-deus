
-- Add trial and payment columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN trial_started_at timestamp with time zone NOT NULL DEFAULT now(),
ADD COLUMN has_paid boolean NOT NULL DEFAULT false;

-- Update handle_new_user to set trial_started_at
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, trial_started_at)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email, now());
  RETURN NEW;
END;
$$;

-- Create function to check subscription status
CREATE OR REPLACE FUNCTION public.get_subscription_status(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE
    WHEN p.has_paid THEN 'paid'
    WHEN p.trial_started_at + interval '7 days' > now() THEN 'trial'
    ELSE 'expired'
  END
  FROM public.profiles p
  WHERE p.user_id = _user_id
$$;
