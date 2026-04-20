import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: "Preciso ter conhecimento bíblico prévio?",
    a: "Não. O programa foi criado para quem está começando e para quem já tem caminhada. O conteúdo é organizado de forma progressiva — você vai entendendo cada conceito no momento certo, sem jargões complicados.",
  },
  {
    q: "Como funciona o cupom OFF50?",
    a: "Ao clicar em \"Quero Transformar Minha Vida\", você será levado à página de checkout. No campo de cupom, insira o código OFF50 para aplicar o desconto adicional. O desconto é aplicado automaticamente no valor final.",
  },
  {
    q: "Por quanto tempo terei acesso?",
    a: "O acesso é vitalício. Uma vez que você adquire o programa, ele é seu para sempre — incluindo todas as atualizações e novos conteúdos que forem adicionados sem custo extra.",
  },
  {
    q: "E se eu não gostar? Tenho garantia?",
    a: "Sim. Você tem 7 dias de garantia total. Se por qualquer motivo não ficar satisfeito, basta enviar um e-mail e devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.",
  },
  {
    q: "Como acesso o conteúdo após a compra?",
    a: "Imediatamente após a compra, você recebe por e-mail o acesso à plataforma e ao aplicativo. Tudo disponível 24h por dia, em qualquer dispositivo — celular, tablet ou computador.",
  },
  {
    q: "O programa serve para qualquer denominação?",
    a: "Sim. O conteúdo é baseado 100% na Bíblia e nos ensinamentos dos apóstolos, sem viés denominacional. Católicos, evangélicos, presbiterianos, batistas e outras denominações já utilizaram o programa com excelentes resultados.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Dúvidas frequentes
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-cream text-center mb-16 leading-tight">
          Perguntas <strong className="text-gold font-bold">Frequentes</strong>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex items-center justify-between gap-6 text-left group"
              >
                <h3 className="font-serif text-xl md:text-2xl font-bold text-cream group-hover:text-gold transition-colors">
                  {faq.q}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  <Plus className="w-5 h-5" />
                </div>
              </button>
              
              <div
                className={`transition-all duration-400 ease-in-out ${
                  openIndex === i ? 'max-h-[300px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
