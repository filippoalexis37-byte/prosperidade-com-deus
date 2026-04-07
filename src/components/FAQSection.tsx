import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O que é o Prosperidade com Deus?",
    a: "É um aplicativo cristão completo com devocionais diários, versículo do dia com reflexão e planos espirituais guiados para ajudar você a fortalecer sua fé e caminhar com Deus todos os dias.",
  },
  {
    q: "Como funciona o teste grátis de 7 dias?",
    a: "Ao se cadastrar, você recebe acesso completo ao app por 7 dias sem nenhuma cobrança. Se gostar, a assinatura continua por apenas R$14,90/mês. Se não quiser continuar, basta cancelar antes dos 7 dias.",
  },
  {
    q: "Preciso ter conhecimento bíblico prévio?",
    a: "Não! O app foi feito para todos os níveis. Os devocionais e reflexões são escritos de forma clara e acessível para qualquer pessoa que queira se aproximar de Deus.",
  },
  {
    q: "O que está incluído na assinatura?",
    a: "Devocionais diários com reflexão, versículo do dia, planos espirituais sobre ansiedade, medo, propósito e disciplina, além de funcionalidades como sequência de leitura e medalhas de crescimento.",
  },
  {
    q: "Posso usar no celular e no computador?",
    a: "Sim! O Prosperidade com Deus funciona em qualquer dispositivo com navegador — celular, tablet ou computador. Basta acessar e fazer login.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, você pode cancelar sua assinatura a qualquer momento. Sem burocracia, sem perguntas. Você continua com acesso até o fim do período pago.",
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
