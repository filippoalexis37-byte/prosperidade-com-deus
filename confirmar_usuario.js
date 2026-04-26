require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Usamos a SERVICE_ROLE_KEY para ter permissões de admin
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("ERRO: Você esqueceu de adicionar SUPABASE_SERVICE_ROLE_KEY no seu arquivo .env");
  console.log("1. Vá ao Dashboard do Supabase -> Settings -> API");
  console.log("2. Copie a chave 'service_role'");
  console.log("3. Adicione no .env: SUPABASE_SERVICE_ROLE_KEY=\"sua_chave\"");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const EMAIL_USUARIO = 'baboutwitch369@gmail.com';

async function confirmarEAtivar() {
  console.log(`\n--- Iniciando ativação para: ${EMAIL_USUARIO} ---\n`);

  // 1. Buscar o usuário
  const { data: { users }, error: fetchError } = await supabase.auth.admin.listUsers();
  const user = users?.find(u => u.email?.toLowerCase() === EMAIL_USUARIO.toLowerCase());

  if (fetchError || !user) {
    console.error("❌ Usuário não encontrado no Auth do Supabase.");
    if (fetchError) console.error("Erro:", fetchError.message);
    return;
  }

  const userId = user.id;
  console.log(`✅ Usuário encontrado! ID: ${userId}`);

  // 2. Confirmar o e-mail no Auth
  const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
    email_confirm: true
  });

  if (authError) {
    console.error("❌ Erro ao confirmar e-mail:", authError.message);
  } else {
    console.log("✅ E-mail confirmado com sucesso!");
  }

  // 3. Atualizar a tabela profiles para garantir acesso
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ 
      is_approved: true,
      has_paid: true 
    })
    .eq('user_id', userId);

  if (profileError) {
    console.error("❌ Erro ao atualizar tabela 'profiles':", profileError.message);
  } else {
    console.log("✅ Acesso liberado na tabela 'profiles'!");
  }
  
  console.log("\n--- Processo finalizado! A usuária já pode logar. ---\n");
}

confirmarEAtivar();
