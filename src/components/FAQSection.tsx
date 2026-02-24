import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O que é o programa Prosperidade com Deus?",
    a: "É um programa completo que combina ensinamentos bíblicos sobre finanças com ferramentas práticas como devocional diário, leitura bíblica guiada e módulos semanais para transformar sua vida financeira e espiritual.",
  },
  {
    q: "Como funciona o cupom OFF50?",
    a: "Basta acessar o checkout e aplicar o cupom OFF50 para receber 50% de desconto. O valor cai de R$ 29,90 para apenas R$ 14,90. A oferta é por tempo limitado!",
  },
  {
    q: "Preciso ter conhecimento bíblico prévio?",
    a: "Não! O programa foi feito para todos os níveis. Você terá acesso à Bíblia completa dentro do app e os conteúdos são explicados de forma clara e acessível.",
  },
  {
    q: "Por quanto tempo terei acesso ao conteúdo?",
    a: "Após a compra, você terá acesso completo a todos os módulos, devocionais e funcionalidades do aplicativo pelo período da sua assinatura.",
  },
  {
    q: "Como acesso o conteúdo após a compra?",
    a: "Após a confirmação do pagamento, você receberá um e-mail com as instruções de acesso. Basta criar sua conta e começar sua jornada de transformação!",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, você pode cancelar sua assinatura a qualquer momento. Sem burocracia, sem perguntas.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Dúvidas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Perguntas <span className="text-gradient-gold">Frequentes</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
