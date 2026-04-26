require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(url, key);

async function run() {
  console.log("Checking profiles...");
  const { data, error } = await supabase.from('profiles').select('*').limit(5);
  console.log(data, error);
  
  // Resend email
  console.log("Resending email to aboutwitch369@gmail.com...");
  const { data: resendData, error: resendError } = await supabase.auth.resend({
    type: 'signup',
    email: 'aboutwitch369@gmail.com',
  });
  console.log("Resend email result:", resendData, resendError);
}
run();
