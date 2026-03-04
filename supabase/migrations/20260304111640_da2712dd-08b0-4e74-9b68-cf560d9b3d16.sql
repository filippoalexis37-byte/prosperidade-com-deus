
create table public.devotional_plans (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  author text not null default 'Prosperidade com Deus',
  duration_days integer not null default 5,
  cover_image_url text not null default '',
  rating numeric(2,1) not null default 4.5,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.devotional_plans enable row level security;
create policy "Authenticated can view plans" on public.devotional_plans for select to authenticated using (true);
create policy "Admins manage plans" on public.devotional_plans for all to authenticated using (has_role(auth.uid(), 'admin'::app_role));

create table public.devotional_plan_days (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references public.devotional_plans(id) on delete cascade not null,
  day_number integer not null,
  title text not null,
  main_verse text not null,
  main_verse_reference text not null,
  complementary_verses text not null default '',
  reflection text not null default '',
  prayer text not null default '',
  created_at timestamptz not null default now(),
  unique(plan_id, day_number)
);

alter table public.devotional_plan_days enable row level security;
create policy "Authenticated can view plan days" on public.devotional_plan_days for select to authenticated using (true);
create policy "Admins manage plan days" on public.devotional_plan_days for all to authenticated using (has_role(auth.uid(), 'admin'::app_role));

create table public.user_plan_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  plan_id uuid references public.devotional_plans(id) on delete cascade not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, plan_id)
);

alter table public.user_plan_progress enable row level security;
create policy "Users view own progress" on public.user_plan_progress for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own progress" on public.user_plan_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own progress" on public.user_plan_progress for update to authenticated using (auth.uid() = user_id);

create table public.user_plan_day_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  plan_id uuid references public.devotional_plans(id) on delete cascade not null,
  day_number integer not null,
  completed_at timestamptz not null default now(),
  unique(user_id, plan_id, day_number)
);

alter table public.user_plan_day_completions enable row level security;
create policy "Users view own completions" on public.user_plan_day_completions for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own completions" on public.user_plan_day_completions for insert to authenticated with check (auth.uid() = user_id);

-- Seed plans
INSERT INTO public.devotional_plans (id, title, description, author, duration_days, cover_image_url, rating, sort_order) VALUES
('a0000000-0000-4000-a000-000000000001', 'Vencendo o Medo', 'Um plano de 5 dias para vencer o medo através da Palavra de Deus. Descubra como a fé pode substituir todo temor.', 'Prosperidade com Deus', 5, '/plans/medo.jpg', 4.8, 1),
('a0000000-0000-4000-a000-000000000002', 'Vencendo a Ansiedade', 'Para quem lida com ansiedade e preocupações. Aprenda a descansar em Deus e confiar na Sua Palavra.', 'Prosperidade com Deus', 5, '/plans/ansiedade.jpg', 4.9, 2),
('a0000000-0000-4000-a000-000000000003', 'Superando a Depressão', 'Encontre esperança e alegria em Deus nos momentos mais difíceis. A Palavra é luz nas trevas.', 'Prosperidade com Deus', 5, '/plans/depressao.jpg', 4.7, 3),
('a0000000-0000-4000-a000-000000000004', 'O Amor de Deus', 'Descubra a profundidade do amor de Deus por você. Cada devocional revela o amor incondicional do Pai.', 'Prosperidade com Deus', 5, '/plans/amor.jpg', 4.9, 4),
('a0000000-0000-4000-a000-000000000005', 'Descanso em Deus', 'Aprenda a descansar na presença de Deus e encontre paz verdadeira no meio da correria.', 'Prosperidade com Deus', 5, '/plans/descanso.jpg', 4.6, 5),
('a0000000-0000-4000-a000-000000000006', 'Identidade em Cristo', 'Descubra quem você é em Cristo. Transforme a forma como você se vê e enfrenta os desafios.', 'Prosperidade com Deus', 7, '/plans/identidade.jpg', 4.8, 6),
('a0000000-0000-4000-a000-000000000007', 'Propósito de Deus', 'Deus tem um propósito para sua vida. Descubra o chamado de Deus e caminhe no Seu plano perfeito.', 'Prosperidade com Deus', 5, '/plans/proposito.jpg', 4.7, 7),
('a0000000-0000-4000-a000-000000000008', 'Prosperidade Bíblica', 'O verdadeiro significado da prosperidade segundo a Bíblia. Alinhe suas finanças ao Reino de Deus.', 'Prosperidade com Deus', 7, '/plans/prosperidade.jpg', 4.8, 8),
('a0000000-0000-4000-a000-000000000009', 'O Poder do Perdão', 'Liberte-se através do perdão. Aprenda a perdoar e ser perdoado segundo o coração de Deus.', 'Prosperidade com Deus', 5, '/plans/perdao.jpg', 4.9, 9),
('a0000000-0000-4000-a000-000000000010', 'Fé Inabalável', 'Fortaleça sua fé. Aprenda com os heróis da fé e confie em Deus em todas as circunstâncias.', 'Prosperidade com Deus', 7, '/plans/fe.jpg', 4.8, 10);

-- Seed plan days
-- Plan 1: Vencendo o Medo
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000001', 1, 'Deus Está Contigo', 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel.', 'Isaías 41:10', 'Deuteronômio 31:6; Salmo 56:3-4', 'O medo é uma das armas mais usadas pelo inimigo. Mas Deus promete estar conosco em todos os momentos. Quando o medo bater, lembre-se: o Criador do universo está ao seu lado.', 'Senhor, eu entrego meus medos nas Tuas mãos. Sei que Tu estás comigo e que nada pode me separar do Teu amor. Fortalece-me com a Tua presença. Amém.'),
('a0000000-0000-4000-a000-000000000001', 2, 'Espírito de Poder', 'Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.', '2 Timóteo 1:7', 'Romanos 8:15; 1 João 4:18', 'O espírito que habita em nós não é de medo, mas de poder. Deus nos capacitou para enfrentar qualquer situação com coragem e amor.', 'Pai, obrigado pelo Espírito de poder que habita em mim. Ajuda-me a viver com coragem, sabendo que sou mais que vencedor em Cristo. Amém.'),
('a0000000-0000-4000-a000-000000000001', 3, 'O Senhor é Minha Luz', 'O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?', 'Salmo 27:1', 'Salmo 118:6; Hebreus 13:6', 'Quando Deus é nossa luz, as trevas do medo não têm poder sobre nós. Ele é nossa fortaleza e refúgio.', 'Senhor, Tu és minha luz nas trevas. Ilumina meu caminho e afasta todo medo do meu coração. Em Ti confio. Amém.'),
('a0000000-0000-4000-a000-000000000001', 4, 'Seja Forte e Corajoso', 'Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.', 'Josué 1:9', 'Isaías 43:1-2; Salmo 31:24', 'Deus não apenas sugere coragem — Ele ordena. E toda ordem de Deus vem acompanhada da provisão para cumpri-la.', 'Deus, obedecerei à Tua ordem de ser forte e corajoso. Sei que Tu vais comigo em cada passo. Amém.'),
('a0000000-0000-4000-a000-000000000001', 5, 'Refúgio no Altíssimo', 'Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.', 'Salmo 91:1-2', 'Salmo 46:1; Provérbios 18:10', 'Habitar no abrigo do Altíssimo é uma escolha diária. Quando escolhemos a presença de Deus, o medo perde seu poder.', 'Pai Celestial, eu escolho habitar no Teu abrigo. Tu és meu refúgio e fortaleza. Declaro que confio em Ti acima de qualquer medo. Amém.');

-- Plan 2: Ansiedade
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000002', 1, 'Não Andeis Ansiosos', 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.', 'Filipenses 4:6-7', 'Mateus 6:34; Salmo 94:19', 'A ansiedade tenta roubar nossa paz, mas Deus nos convida a entregar cada preocupação a Ele através da oração.', 'Senhor, eu entrego toda minha ansiedade a Ti. Ensina-me a orar em vez de me preocupar. Tua paz guarde meu coração. Amém.'),
('a0000000-0000-4000-a000-000000000002', 2, 'Não se Preocupe', 'Por isso vos digo: não andeis ansiosos pela vossa vida, quanto ao que haveis de comer ou beber; nem pelo vosso corpo, quanto ao que haveis de vestir.', 'Mateus 6:25', 'Mateus 6:26-27; Lucas 12:22-26', 'Jesus nos ensina que a preocupação não acrescenta nada à nossa vida. Nosso Pai Celestial conhece todas as nossas necessidades.', 'Pai, perdoa-me por me preocupar com coisas que Tu já tens sob controle. Ajuda-me a confiar na Tua provisão diária. Amém.'),
('a0000000-0000-4000-a000-000000000002', 3, 'Lance Sobre Ele', 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.', '1 Pedro 5:7', 'Salmo 55:22; Salmo 68:19', 'Lançar a ansiedade sobre Deus é um ato de fé. Significa confiar que Ele cuida de nós melhor do que nós mesmos.', 'Senhor, eu lanço sobre Ti toda ansiedade. Sei que Tu cuidas de mim com amor. Descanso em Ti. Amém.'),
('a0000000-0000-4000-a000-000000000002', 4, 'Entrega ao Senhor', 'Lança o teu cuidado sobre o Senhor, e ele te susterá; jamais permitirá que o justo seja abalado.', 'Salmo 55:22', 'Provérbios 3:5-6; Isaías 41:13', 'Deus promete nos sustentar quando entregamos nossos cuidados a Ele. O justo não será abalado porque Deus o segura.', 'Deus, eu entrego todos os meus cuidados a Ti. Sustenta-me com Tua mão poderosa. Não serei abalado. Amém.'),
('a0000000-0000-4000-a000-000000000002', 5, 'Paz Perfeita', 'Tu conservarás em perfeita paz aquele cuja mente está firme em ti; porque ele confia em ti.', 'Isaías 26:3', 'João 14:27; Colossenses 3:15', 'A paz perfeita vem quando fixamos nossa mente em Deus. Não é ausência de problemas, mas a presença de Deus em meio a eles.', 'Senhor, fixa minha mente em Ti. Que Tua paz perfeita inunde meu coração e afaste toda ansiedade. Em Jesus, amém.');

-- Plan 3: Depressão
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000003', 1, 'Esperança Para a Alma', 'Por que estás abatida, ó minha alma? Por que te perturbas dentro de mim? Espera em Deus, pois ainda o louvarei, a ele, meu auxílio e meu Deus.', 'Salmo 42:11', 'Salmo 43:5; Lamentações 3:21-23', 'Mesmo nos momentos mais escuros, podemos falar com nossa alma e direcioná-la para Deus. A esperança renasce quando olhamos para Ele.', 'Senhor, minha alma está abatida, mas eu escolho esperar em Ti. Tu és meu auxílio e meu Deus. Renova minha esperança. Amém.'),
('a0000000-0000-4000-a000-000000000003', 2, 'Deus Está Perto', 'Perto está o Senhor dos que têm o coração quebrantado e salva os de espírito oprimido.', 'Salmo 34:18', 'Salmo 147:3; Isaías 61:1-3', 'Nos momentos de maior dor, Deus se aproxima ainda mais. Ele não se afasta do coração quebrantado — Ele o abraça.', 'Pai, sei que Tu estás perto de mim neste momento. Cura meu coração quebrantado e restaura minha alegria. Amém.'),
('a0000000-0000-4000-a000-000000000003', 3, 'Tudo Coopera Para o Bem', 'Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.', 'Romanos 8:28', 'Gênesis 50:20; Jeremias 29:11', 'Mesmo quando não entendemos, Deus está trabalhando. Cada dor tem um propósito nas mãos do Pai.', 'Deus, eu confio que Tu estás fazendo todas as coisas cooperarem para o meu bem, mesmo quando não consigo ver. Amém.'),
('a0000000-0000-4000-a000-000000000003', 4, 'Forças Renovadas', 'Mas os que esperam no Senhor renovarão as suas forças, subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.', 'Isaías 40:31', 'Salmo 103:1-5; 2 Coríntios 4:16-17', 'Esperar no Senhor não é passividade — é confiança ativa. Deus renova nossas forças quando nos apoiamos Nele.', 'Senhor, renova minhas forças. Quero voar como águia, correr sem cansar, caminhar sem fatigar. Em Ti encontro energia. Amém.'),
('a0000000-0000-4000-a000-000000000003', 5, 'Planos de Esperança', 'Porque eu bem sei os planos que tenho a vosso respeito, diz o Senhor; planos de paz e não de mal, para vos dar o fim que esperais.', 'Jeremias 29:11', 'Salmo 138:8; Filipenses 1:6', 'Deus tem planos de paz para você. O futuro que Ele preparou é cheio de esperança e propósito.', 'Pai, obrigado pelos planos que tens para mim. Confio no Teu futuro de paz e esperança. Levanta-me da tristeza. Amém.');

-- Plan 4: Amor
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000004', 1, 'Amor Incondicional', 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.', 'João 3:16', 'Romanos 5:8; 1 João 4:9-10', 'O amor de Deus não depende de nós. Ele nos amou primeiro, quando ainda éramos pecadores. Esse é o amor mais puro que existe.', 'Pai, obrigado por me amar incondicionalmente. Ajuda-me a compreender a profundidade do Teu amor por mim. Amém.'),
('a0000000-0000-4000-a000-000000000004', 2, 'Nada Nos Separa', 'Porque eu estou bem certo de que nem a morte, nem a vida poderá nos separar do amor de Deus, que está em Cristo Jesus, nosso Senhor.', 'Romanos 8:38-39', 'João 10:28-29; Isaías 54:10', 'Nenhuma circunstância, nenhum erro, nenhuma força pode nos separar do amor de Deus. Seu amor é eterno e inabalável.', 'Senhor, obrigado porque nada pode me separar do Teu amor. Em Cristo, estou seguro para sempre. Amém.'),
('a0000000-0000-4000-a000-000000000004', 3, 'Deus É Amor', 'Aquele que não ama não conhece a Deus, pois Deus é amor.', '1 João 4:8', '1 João 4:16; 1 Coríntios 13:4-7', 'Deus não apenas tem amor — Ele É amor. Tudo que Ele faz é motivado por amor.', 'Deus de amor, revela-Te a mim. Quero conhecer Teu amor profundo e deixar que ele transforme minha vida. Amém.'),
('a0000000-0000-4000-a000-000000000004', 4, 'Arraigados em Amor', 'Para que, arraigados e alicerçados em amor, possais compreender qual é a largura, e o comprimento, e a altura, e a profundidade do amor de Cristo.', 'Efésios 3:17-19', 'Colossenses 2:6-7; Judas 1:21', 'O amor de Cristo tem dimensões que ultrapassam nosso entendimento. Somos convidados a mergulhar nesse amor sem fim.', 'Jesus, arraiga-me no Teu amor. Que eu compreenda cada vez mais a imensidão do que sentes por mim. Amém.'),
('a0000000-0000-4000-a000-000000000004', 5, 'Amor Eterno', 'Dai graças ao Senhor, porque ele é bom; porque a sua misericórdia dura para sempre.', 'Salmo 136:1', 'Jeremias 31:3; Salmo 100:5', 'A misericórdia de Deus é renovada a cada manhã. Seu amor não tem prazo de validade.', 'Senhor, obrigado pelo Teu amor eterno. A cada manhã Tua misericórdia se renova. Sou grato por Tua fidelidade. Amém.');

-- Plan 5: Descanso
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000005', 1, 'Venham a Mim', 'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.', 'Mateus 11:28', 'Mateus 11:29-30; Isaías 28:12', 'Jesus convida os cansados para descansar Nele. Não precisamos carregar sozinhos o peso da vida.', 'Jesus, venho a Ti cansado e sobrecarregado. Alivia meu fardo e dá-me o Teu descanso. Amém.'),
('a0000000-0000-4000-a000-000000000005', 2, 'O Bom Pastor', 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastagens, guia-me mansamente a águas tranquilas.', 'Salmo 23:1-3', 'João 10:11; Ezequiel 34:15', 'Como ovelhas do Bom Pastor, somos guiados a lugares de descanso e restauração.', 'Senhor, Tu és meu pastor. Guia-me a águas tranquilas e restaura minha alma cansada. Amém.'),
('a0000000-0000-4000-a000-000000000005', 3, 'Sua Presença', 'Respondeu-lhe o Senhor: A minha presença irá contigo, e eu te darei descanso.', 'Êxodo 33:14', 'Salmo 16:11; Salmo 91:1', 'O maior descanso vem da presença de Deus. Quando Ele está conosco, encontramos paz mesmo no deserto.', 'Pai, Tua presença é meu maior tesouro. Descansarei sabendo que Tu estás comigo. Amém.'),
('a0000000-0000-4000-a000-000000000005', 4, 'Aquietai-vos', 'Aquietai-vos e sabei que eu sou Deus; sou exaltado entre as nações, sou exaltado na terra.', 'Salmo 46:10', 'Isaías 30:15; Habacuque 2:20', 'Em um mundo barulhento, Deus nos chama à quietude. É no silêncio que ouvimos Sua voz.', 'Deus, ajuda-me a aquietar meu coração. No silêncio, quero ouvir Tua voz e descansar em Ti. Amém.'),
('a0000000-0000-4000-a000-000000000005', 5, 'Repouso Verdadeiro', 'Portanto, resta um repouso para o povo de Deus.', 'Hebreus 4:9-10', 'Hebreus 4:11; Gênesis 2:2-3', 'O repouso de Deus não é preguiça — é confiança. Descansamos porque sabemos que Deus está trabalhando por nós.', 'Senhor, eu entro no Teu repouso. Descanso das minhas obras e confio que Tu completas o que falta. Amém.');

-- Plan 6: Identidade (7 days)
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000006', 1, 'Nova Criatura', 'Se alguém está em Cristo, nova criatura é: as coisas velhas já passaram; eis que tudo se fez novo.', '2 Coríntios 5:17', 'Gálatas 6:15; Efésios 4:22-24', 'Em Cristo, você não é mais definido pelo seu passado. Você é uma nova criatura com uma nova identidade.', 'Pai, obrigado por me fazer uma nova criatura. Ajuda-me a viver na novidade que Cristo me deu. Amém.'),
('a0000000-0000-4000-a000-000000000006', 2, 'Obra de Deus', 'Porque somos feitura dele, criados em Cristo Jesus para as boas obras.', 'Efésios 2:10', 'Salmo 139:13-14; Isaías 64:8', 'Você é obra-prima de Deus. Ele te criou com propósito e preparou boas obras para você realizar.', 'Criador, obrigado por me fazer com tanto cuidado. Quero caminhar nas boas obras que preparaste para mim. Amém.'),
('a0000000-0000-4000-a000-000000000006', 3, 'Geração Eleita', 'Vós sois a geração eleita, o sacerdócio real, a nação santa, o povo adquirido.', '1 Pedro 2:9', 'Deuteronômio 7:6; Isaías 43:1', 'Você não é qualquer pessoa — é parte da geração eleita de Deus. Chamado das trevas para a luz.', 'Senhor, obrigado por me escolher e me chamar para a Tua luz. Sou parte da Tua geração eleita. Amém.'),
('a0000000-0000-4000-a000-000000000006', 4, 'Vivo em Cristo', 'Já não sou eu quem vive, mas Cristo vive em mim.', 'Gálatas 2:20', 'Colossenses 1:27; Filipenses 1:21', 'Quando Cristo vive em nós, nossa identidade se funde com a Dele. Vivemos pela fé, não por nossas forças.', 'Jesus, vive em mim. Que minha vida reflita a Tua presença e o Teu amor. Amém.'),
('a0000000-0000-4000-a000-000000000006', 5, 'Filhos de Deus', 'A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus.', 'João 1:12', 'Romanos 8:14-16; 1 João 3:1', 'Você não é servo ou estranho — você é filho de Deus. Essa é a identidade mais poderosa que existe.', 'Pai, sou Teu filho amado. Ajuda-me a viver com a confiança de quem sou em Ti. Amém.'),
('a0000000-0000-4000-a000-000000000006', 6, 'Herdeiros de Deus', 'Se somos filhos, somos também herdeiros, herdeiros de Deus e co-herdeiros com Cristo.', 'Romanos 8:17', 'Gálatas 4:7; Efésios 1:11', 'Como filhos, somos herdeiros de tudo que pertence ao Pai. A herança de Deus é para você.', 'Pai, obrigado pela herança que tenho em Cristo. Ajuda-me a viver como herdeiro do Teu Reino. Amém.'),
('a0000000-0000-4000-a000-000000000006', 7, 'Escondido em Cristo', 'Porque morrestes, e a vossa vida está escondida com Cristo em Deus.', 'Colossenses 3:3', 'Colossenses 3:1-2; Efésios 2:6', 'Sua vida está segura em Cristo. Nada pode atingir quem está escondido no lugar mais seguro do universo.', 'Senhor, minha vida está escondida em Ti. Nada pode me abalar porque estou seguro em Cristo. Amém.');

-- Plan 7: Propósito (5 days)
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000007', 1, 'Conhecido Antes de Nascer', 'Antes que eu te formasse no ventre materno, eu te conheci, e antes que saísses da madre, te consagrei.', 'Jeremias 1:5', 'Salmo 139:15-16; Isaías 49:1', 'Deus te conhecia antes mesmo de você nascer. Seu propósito foi traçado antes da fundação do mundo.', 'Pai, obrigado por me conhecer antes de eu nascer. Revela o propósito que traçaste para minha vida. Amém.'),
('a0000000-0000-4000-a000-000000000007', 2, 'Criados Para Boas Obras', 'Somos feitura dele, criados em Cristo Jesus para as boas obras, as quais Deus preparou.', 'Efésios 2:10', 'Tito 2:14; 2 Timóteo 3:17', 'Você foi criado com propósito. Deus preparou obras específicas para você realizar nesta terra.', 'Senhor, mostra-me as boas obras que preparaste para mim. Quero cumprir Teu propósito. Amém.'),
('a0000000-0000-4000-a000-000000000007', 3, 'O Coração Planeja', 'O coração do homem pode fazer planos, mas a resposta certa dos lábios vem do Senhor.', 'Provérbios 16:9', 'Provérbios 19:21; Salmo 37:23', 'Podemos fazer planos, mas é Deus quem dirige nossos passos. Submeta seus planos a Ele.', 'Deus, submeto meus planos a Ti. Dirige meus passos segundo a Tua vontade perfeita. Amém.'),
('a0000000-0000-4000-a000-000000000007', 4, 'Mente Transformada', 'Não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente.', 'Romanos 12:1-2', 'Efésios 4:23; Colossenses 3:10', 'Para descobrir o propósito de Deus, precisamos renovar nossa mente. Deixe a Palavra transformar sua forma de pensar.', 'Senhor, renova minha mente. Transforma meu pensamento para que eu conheça Tua vontade perfeita. Amém.'),
('a0000000-0000-4000-a000-000000000007', 5, 'Ele Completará a Obra', 'Aquele que começou boa obra em vós há de completá-la até ao Dia de Cristo Jesus.', 'Filipenses 1:6', 'Hebreus 12:2; 1 Tessalonicenses 5:24', 'Deus começou uma obra em você e vai completá-la. Confie no processo e no tempo de Deus.', 'Pai, confio que Tu completarás a obra que começaste em mim. Não desistirei do Teu propósito. Amém.');

-- Plan 8: Prosperidade (7 days)
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000008', 1, 'Meditar na Palavra', 'Não se aparte da tua boca o livro desta Lei; antes, medita nele dia e noite, para que tenhas cuidado de fazer conforme tudo quanto nele está escrito.', 'Josué 1:8', 'Salmo 1:1-3; Provérbios 4:20-22', 'A verdadeira prosperidade começa com a meditação na Palavra de Deus. É ela que nos guia ao sucesso.', 'Senhor, ajuda-me a meditar na Tua Palavra dia e noite. Que ela seja a base da minha prosperidade. Amém.'),
('a0000000-0000-4000-a000-000000000008', 2, 'Fidelidade nos Dízimos', 'Trazei todos os dízimos à casa do Tesouro, para que haja mantimento na minha casa, e provai-me nisto, diz o Senhor.', 'Malaquias 3:10', 'Provérbios 3:9-10; Lucas 6:38', 'Deus nos desafia a provar Sua fidelidade através dos dízimos. Quando somos fiéis, Ele abre as janelas do céu.', 'Pai, quero ser fiel nos dízimos e ofertas. Confio na Tua provisão abundante. Amém.'),
('a0000000-0000-4000-a000-000000000008', 3, 'Suprimento Total', 'O meu Deus, segundo a sua riqueza em glória, há de suprir, em Cristo Jesus, cada uma de vossas necessidades.', 'Filipenses 4:19', 'Mateus 6:31-33; Salmo 37:25', 'Deus não supre apenas algumas necessidades — Ele supre todas, segundo Suas riquezas em glória.', 'Deus, obrigado por suprir todas as minhas necessidades. Confio na Tua riqueza em glória. Amém.'),
('a0000000-0000-4000-a000-000000000008', 4, 'Força Para Prosperar', 'Lembra-te do Senhor, teu Deus, porque é ele o que te dá força para adquirires riqueza.', 'Deuteronômio 8:18', 'Provérbios 10:22; 1 Crônicas 29:12', 'A capacidade de prosperar vem de Deus. Ele nos dá sabedoria e força para construir riqueza com propósito.', 'Senhor, obrigado pela força que me dás. Usa minha prosperidade para glorificar Teu nome. Amém.'),
('a0000000-0000-4000-a000-000000000008', 5, 'Honrar com os Bens', 'Honra ao Senhor com os teus bens e com as primícias de toda a tua renda.', 'Provérbios 3:9-10', 'Mateus 6:19-21; 1 Timóteo 6:17-19', 'Quando honramos a Deus com nossos bens, Ele faz nossos celeiros transbordarem.', 'Pai, quero honrar-Te com meus bens. Que minha generosidade reflita Teu coração. Amém.'),
('a0000000-0000-4000-a000-000000000008', 6, 'Semeadura Generosa', 'Aquele que semeia pouco, pouco também ceifará; e o que semeia com fartura, com abundância também ceifará.', '2 Coríntios 9:6-7', 'Gálatas 6:7-9; Provérbios 11:24-25', 'A prosperidade está ligada à semeadura. Quem semeia com generosidade colhe com abundância.', 'Senhor, faz de mim um semeador generoso. Quero colher abundância para Tua glória. Amém.'),
('a0000000-0000-4000-a000-000000000008', 7, 'Árvore Frutífera', 'Será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto na estação própria, e tudo quanto fizer prosperará.', 'Salmo 1:3', 'Jeremias 17:7-8; João 15:5', 'Como árvore plantada junto às águas, quem está firme em Deus prospera em tudo.', 'Deus, planta-me junto às Tuas águas. Que eu produza fruto em abundância e prospere em tudo. Amém.');

-- Plan 9: Perdão (5 days)
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000009', 1, 'Perdoar Como Cristo', 'Suportai-vos uns aos outros, perdoai-vos mutuamente. Assim como o Senhor vos perdoou, assim também perdoai vós.', 'Colossenses 3:13', 'Efésios 4:32; Mateus 18:21-22', 'Perdoar não é fácil, mas Cristo nos deu o exemplo. Ele nos perdoou primeiro, e nos chama a fazer o mesmo.', 'Jesus, assim como Tu me perdoaste, ajuda-me a perdoar quem me feriu. Liberta meu coração da amargura. Amém.'),
('a0000000-0000-4000-a000-000000000009', 2, 'Condição do Perdão', 'Se perdoardes aos homens as suas ofensas, também vosso Pai celeste vos perdoará.', 'Mateus 6:14', 'Mateus 6:15; Marcos 11:25-26', 'O perdão de Deus está conectado ao nosso perdão aos outros. Quando perdoamos, abrimos caminho para a graça.', 'Pai, perdoa minhas ofensas assim como eu perdoo os que me ofenderam. Limpa meu coração. Amém.'),
('a0000000-0000-4000-a000-000000000009', 3, 'Bondade e Compaixão', 'Sede uns para com os outros benignos, compassivos, perdoando-vos uns aos outros, como também Deus, em Cristo, vos perdoou.', 'Efésios 4:32', 'Efésios 4:31; Colossenses 3:12', 'Perdão nasce da bondade e compaixão. Quando vemos os outros com os olhos de Cristo, perdoar se torna possível.', 'Senhor, enche-me de bondade e compaixão. Que eu veja os outros como Tu os vês. Amém.'),
('a0000000-0000-4000-a000-000000000009', 4, 'Perdão na Oração', 'Quando estiverdes orando, se tendes alguma coisa contra alguém, perdoai.', 'Marcos 11:25', 'Lucas 11:4; Tiago 5:16', 'A oração e o perdão caminham juntos. Não podemos orar com poder se guardamos rancor no coração.', 'Deus, antes de orar, eu perdoo todos que me feriram. Limpa meu coração para que minhas orações subam a Ti. Amém.'),
('a0000000-0000-4000-a000-000000000009', 5, 'Liberdade do Perdão', 'Não julgueis e não sereis julgados; não condeneis e não sereis condenados; perdoai e sereis perdoados.', 'Lucas 6:37', 'Romanos 12:19; Provérbios 19:11', 'O perdão nos liberta mais do que liberta quem nos feriu. É um ato de obediência que traz liberdade.', 'Pai, escolho perdoar e ser livre. Que o perdão flua do meu coração como um rio de graça. Amém.');

-- Plan 10: Fé (7 days)
INSERT INTO public.devotional_plan_days (plan_id, day_number, title, main_verse, main_verse_reference, complementary_verses, reflection, prayer) VALUES
('a0000000-0000-4000-a000-000000000010', 1, 'A Certeza da Fé', 'Ora, a fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem.', 'Hebreus 11:1', 'Romanos 8:24-25; 2 Coríntios 4:18', 'Fé é crer no que não vemos. É confiar nas promessas de Deus mesmo quando as circunstâncias dizem o contrário.', 'Senhor, fortalece minha fé. Quero crer nas Tuas promessas mesmo quando não posso ver o resultado. Amém.'),
('a0000000-0000-4000-a000-000000000010', 2, 'Fé Pelo Ouvir', 'A fé vem pelo ouvir, e o ouvir pela palavra de Cristo.', 'Romanos 10:17', 'João 20:31; Atos 4:4', 'A fé cresce quando ouvimos a Palavra de Deus. Quanto mais nos alimentamos dela, mais forte fica nossa fé.', 'Pai, abre meus ouvidos para Tua Palavra. Que minha fé cresça a cada dia. Amém.'),
('a0000000-0000-4000-a000-000000000010', 3, 'Fé Sem Dúvida', 'Peça-a, porém, com fé, em nada duvidando.', 'Tiago 1:6', 'Marcos 11:23-24; Mateus 21:21-22', 'Deus nos chama a pedir com fé, sem duvidar. A dúvida nos torna instáveis, mas a fé nos firma na rocha.', 'Senhor, remove toda dúvida do meu coração. Quero pedir com fé firme, confiando em Ti. Amém.'),
('a0000000-0000-4000-a000-000000000010', 4, 'Fé Como Grão de Mostarda', 'Se tiverdes fé como um grão de mostarda, direis a este monte: Passa daqui para acolá, e ele passará.', 'Mateus 17:20', 'Lucas 17:6; Marcos 9:23', 'Não é o tamanho da fé que importa, mas em Quem ela está depositada. Até uma fé pequena move montanhas.', 'Jesus, mesmo que minha fé seja pequena, confio no Teu poder imenso. Move as montanhas da minha vida. Amém.'),
('a0000000-0000-4000-a000-000000000010', 5, 'Fé Que Agrada', 'Sem fé é impossível agradar a Deus, porquanto é necessário que aquele que se aproxima de Deus creia que ele existe.', 'Hebreus 11:6', 'Romanos 4:20-21; Gálatas 3:11', 'A fé agrada a Deus. Quando cremos e buscamos Sua face, Ele nos recompensa com Sua presença.', 'Deus, quero Te agradar com minha fé. Creio que Tu existes e recompensas os que Te buscam. Amém.'),
('a0000000-0000-4000-a000-000000000010', 6, 'Andar Por Fé', 'Porque andamos por fé e não pelo que vemos.', '2 Coríntios 5:7', 'Habacuque 2:4; Romanos 1:17', 'Andar por fé significa confiar em Deus mesmo quando o caminho não é visível.', 'Senhor, ensina-me a andar por fé. Mesmo quando não vejo o caminho, confio que Tu me guias. Amém.'),
('a0000000-0000-4000-a000-000000000010', 7, 'Vitória da Fé', 'Todo o que é nascido de Deus vence o mundo; e esta é a vitória que vence o mundo: a nossa fé.', '1 João 5:4', '1 João 5:5; Romanos 8:37', 'A fé é a arma que vence o mundo. Com fé em Cristo, somos mais que vencedores em qualquer batalha.', 'Pai, obrigado pela vitória que tenho pela fé. Em Cristo, sou mais que vencedor. Amém.');
