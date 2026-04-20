import React from 'react';

const pillars = [
  {
    num: "01",
    icon: "🙏",
    title: "Oração como Conversa",
    text: "Pare de ver a oração como obrigação. Deus quer ouvir sobre seu dia, seus medos, seus sonhos. Ele é Pai — converse com Ele como filho.",
    verse: "📖 Filipenses 4:6",
  },
  {
    num: "02",
    icon: "📖",
    title: "Palavra que Transforma",
    text: "A Bíblia não é um livro de regras. É uma carta de amor. Quando você lê com o coração aberto, cada versículo fala diretamente à sua situação.",
    verse: "📖 Salmos 119:105",
  },
  {
    num: "03",
    icon: "🔥",
    title: "Silêncio e Presença",
    text: "Em um mundo barulhento, aprender a ficar quieto na presença de Deus é um superpoder. É no silêncio que Ele fala mais alto ao seu coração.",
    verse: "📖 Salmos 46:10",
  },
  {
    num: "04",
    icon: "💎",
    title: "Identidade em Cristo",
    text: "Você não é seus erros, seu passado ou o que outros dizem. Você é filho do Deus Altíssimo. Quando sua identidade muda, tudo ao redor muda.",
    verse: "📖 Jeremias 29:11",
  },
  {
    num: "05",
    icon: "🌿",
    title: "Fé Ativa — Não Passiva",
    text: "Fé sem ação está morta. Conectar-se com Deus é agir com coragem todos os dias, mesmo sem ver o resultado. A fé move montanhas — e contas bancárias.",
    verse: "📖 Tiago 2:17",
  },
  {
    num: "06",
    icon: "✝",
    title: "Comunhão Diária",
    text: "Não é sobre horas de oração. É sobre cultivar o hábito de buscar Deus em tudo — ao acordar, nas decisões, nos momentos de crise e de gratidão.",
    verse: "📖 1 Tessalonicenses 5:17",
  },
];

const PillarsSection = () => {
  return (
    <section id="pilares" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Os 6 pilares da conexão
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-cream text-center mb-6 leading-tight">
          Como se conectar com Deus<br /><strong className="text-gold font-bold">de verdade</strong>
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Não é religião. É relacionamento. Veja como cada pilar vai transformar sua vida espiritual, emocional e financeira.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-card/40 border border-white/5 rounded-3xl p-8 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
              
              <div className="font-serif text-6xl font-light text-gold/10 absolute top-4 right-6 leading-none">
                {pillar.num}
              </div>

              <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>

              <h3 className="font-serif text-2xl font-bold text-cream mb-4">
                {pillar.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {pillar.text}
              </p>

              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
                  {pillar.verse}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
