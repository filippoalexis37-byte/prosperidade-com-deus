import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface StreakInfo {
  currentStreak: number;
  loading: boolean;
}

export const useStreak = (): StreakInfo => {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAndLog = async () => {
      // Log today's activity (upsert, so it won't duplicate)
      await supabase.from("user_activity_log").upsert(
        { user_id: user.id, activity_date: new Date().toISOString().split("T")[0] },
        { onConflict: "user_id,activity_date" }
      );

      // Fetch recent activity dates
      const { data } = await supabase
        .from("user_activity_log")
        .select("activity_date")
        .eq("user_id", user.id)
        .order("activity_date", { ascending: false })
        .limit(60);

      if (!data || data.length === 0) {
        setCurrentStreak(0);
        setLoading(false);
        return;
      }

      // Calculate streak
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < data.length; i++) {
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);
        const dateStr = expectedDate.toISOString().split("T")[0];

        if (data[i].activity_date === dateStr) {
          streak++;
        } else {
          break;
        }
      }

      setCurrentStreak(streak);
      setLoading(false);
    };

    fetchAndLog();
  }, [user]);

  return { currentStreak, loading };
};
