import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const apostles = [
  "Paulo", "Pedro", "João", "Tiago", "André", "Filipe", "Bartolomeu",
  "Mateus", "Tomé", "Tadeu", "Simão", "Judas (irmão de Tiago)"
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Require authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const today = new Date().toISOString().split("T")[0];

    // Check if already exists
    const { data: existing } = await supabase
      .from("daily_devotionals")
      .select("*")
      .eq("devotional_date", today)
      .single();

    if (existing) {
      return new Response(JSON.stringify(existing), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apostle = apostles[new Date().getDate() % apostles.length];

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um pastor evangélico sábio e amoroso. Gere um devocional diário cristão em português brasileiro focado em prosperidade com Deus, transformação financeira pela fé e obediência a Deus. O devocional deve ser inspirado nos ensinamentos do apóstolo ${apostle}. Use versículos da Bíblia NVI.`,
          },
          {
            role: "user",
            content: `Gere o devocional do dia ${today} com foco no apóstolo ${apostle}. Retorne APENAS um JSON válido com esta estrutura exata, sem markdown:
{"title":"título inspirador","content":"texto devocional de 3-4 parágrafos","verse":"texto do versículo","verse_reference":"referência bíblica","comfort_word":"uma palavra de conforto e fortalecimento da fé de 2-3 frases"}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_devotional",
              description: "Create a daily devotional with structured content",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Inspiring title for the devotional" },
                  content: { type: "string", description: "Devotional text, 3-4 paragraphs" },
                  verse: { type: "string", description: "Bible verse text" },
                  verse_reference: { type: "string", description: "Bible verse reference" },
                  comfort_word: { type: "string", description: "A comforting word to strengthen faith" },
                },
                required: ["title", "content", "verse", "verse_reference", "comfort_word"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_devotional" } },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns minutos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI generation failed");
    }

    const aiData = await aiResponse.json();
    let devotionalData: any;

    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      devotionalData = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse from content
      const content = aiData.choices?.[0]?.message?.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        devotionalData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse AI response");
      }
    }

    const record = {
      devotional_date: today,
      title: devotionalData.title,
      content: devotionalData.content,
      verse: devotionalData.verse,
      verse_reference: devotionalData.verse_reference,
      comfort_word: devotionalData.comfort_word,
      apostle,
    };

    const { data: inserted, error } = await supabase
      .from("daily_devotionals")
      .insert(record)
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      // Return the generated data even if save fails
      return new Response(JSON.stringify(record), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(inserted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
