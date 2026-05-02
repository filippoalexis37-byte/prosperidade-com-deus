
-- 1) Trigger to prevent non-admins from changing is_approved / has_paid on profiles
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    IF NEW.is_approved IS DISTINCT FROM OLD.is_approved THEN
      RAISE EXCEPTION 'Not allowed to change is_approved';
    END IF;
    IF NEW.has_paid IS DISTINCT FROM OLD.has_paid THEN
      RAISE EXCEPTION 'Not allowed to change has_paid';
    END IF;
    IF NEW.trial_started_at IS DISTINCT FROM OLD.trial_started_at THEN
      RAISE EXCEPTION 'Not allowed to change trial_started_at';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_privilege_escalation ON public.profiles;
CREATE TRIGGER profiles_prevent_privilege_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- 2) Restrict devotional plans/days to approved users (server-side paywall)
DROP POLICY IF EXISTS "Authenticated can view plans" ON public.devotional_plans;
CREATE POLICY "Approved users can view plans"
ON public.devotional_plans
FOR SELECT
TO authenticated
USING (public.is_approved(auth.uid()));

DROP POLICY IF EXISTS "Authenticated can view plan days" ON public.devotional_plan_days;
CREATE POLICY "Approved users can view plan days"
ON public.devotional_plan_days
FOR SELECT
TO authenticated
USING (public.is_approved(auth.uid()));

-- 3) Explicitly block non-admin INSERT/UPDATE/DELETE on user_roles
-- The "Admins can manage roles" ALL policy already covers admins; add a restrictive
-- safeguard so even if a future policy grants insert, non-admins are blocked.
CREATE POLICY "Block non-admin role changes"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO public
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
