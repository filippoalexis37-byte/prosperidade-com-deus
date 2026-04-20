import React from 'react';
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/9Mi4R0FainnLnX9wzmRn";

interface SubscriptionViewProps {
  status: string;
  daysLeft: number;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ status, daysLeft }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-350">
      <div className="bg-gradient-to-b from-[#06100A] to-[#09080A] px-6 pt-14 pb-7 text-center relative overflow-hidden">
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[260px] h-[260px] rounded-full bg-gold/10 blur-[60px] pointer-events-none" />
        <h1 className="font-serif text-[22px] font-bold text-[#F8EED8] mb-2 relative z-10">Sua Assinatura</h1>
        <p className="text-[13px] text-[#F8EED8]/50 relative z-10 leading-relaxed max-w-[280px] mx-auto">
          {status === 'paid' 
            ? 'Você tem acesso vitalício a toda a jornada espiritual.' 
            : `Você está no período de teste. Restam ${daysLeft} dias de acesso.`}
        </p>
      </div>

      <div className="px-5 pt-5 pb-10">
        <div className="bg-gradient-to-br from-[#120D20] to-[#1A1428] border border-gold/30 rounded-[24px] p-7 md:p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(201,164,85,0.06)] relative overflow-hidden mb-4">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-gold/7 blur-[100px] pointer-events-none" />
          
          <div className="inline-block bg-gradient-to-br from-[#7A5C1E] to-[#C9A455] text-[#09080A] rounded-full px-[18px] py-[5px] text-[10px] font-extrabold tracking-[2px] uppercase mb-[18px] relative z-10">
            {status === 'paid' ? '✦ Plano Ativo ✦' : '✦ Melhor Opção ✦'}
          </div>

          <div className="font-serif text-[22px] font-bold text-[#F8EED8] mb-1.5 relative z-10">Prosperidade com Deus</div>
          <div className="text-[13px] text-[#F8EED8]/50 mb-[22px] relative z-10">Transformação espiritual, emocional e financeira</div>
          
          <div className="text-sm text-white/25 line-through mb-1 relative z-10">R$ 59,90/mês</div>
          <div className="font-serif text-[52px] font-bold bg-gradient-to-br from-[#F2D47B] to-[#C9A455] bg-clip-text text-transparent leading-none relative z-10">
            R$ 29,90
          </div>
          <div className="text-[13px] text-[#F8EED8]/50 mt-1 mb-6 relative z-10">por mês • cancele quando quiser</div>

          <div className="text-left space-y-2.5 mb-6 relative z-10">
            {[
              "365 devocionais diários transformadores",
              "Módulo completo \"O Deserto\" — 40+ ensinamentos",
              "Persistência — como manter-se firme",
              "Meditações baseadas nos Apóstolos",
              "Plano de 30 dias de transformação guiada",
              "Prosperidade financeira alinhada ao Reino",
              "Acesso em qualquer dispositivo — offline",
              "Cancele a qualquer momento • 7 dias de garantia"
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-[#7A5C1E] to-[#C9A455] flex items-center justify-center text-[11px] text-[#09080A] font-extrabold flex-shrink-0 mt-0.5">✓</div>
                <div className="text-[13px] text-[#E8D5A8] leading-tight">{feature}</div>
              </div>
            ))}
          </div>

          {status !== 'paid' && (
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
              <button className="w-full bg-gradient-to-br from-[#7A5C1E] via-[#C9A455] to-[#F2D47B] text-[#09080A] border-none rounded-full py-[18px] font-serif text-[15px] font-bold shadow-[0_0_30px_rgba(201,164,85,0.4)] transition-all active:scale-[0.97] animate-[glowPulse_3s_infinite] relative z-10">
                ✦ Assinar por R$ 29,90/mês
              </button>
            </a>
          )}

          <div className="flex justify-center gap-4 flex-wrap mt-4 relative z-10">
            {[
              { icon: '🔒', label: 'Pagamento seguro' },
              { icon: '⚡', label: 'Acesso imediato' },
              { icon: '🛡', label: '7 dias de garantia' },
            ].map((item, i) => (
              <div key={i} className="text-[11px] text-[#F8EED8]/50 flex items-center gap-1">
                <span className="text-gold text-[13px]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1720]/95 border border-white/[0.15] rounded-2xl p-[18px_20px] flex items-center gap-3.5 active:scale-[0.98] transition-transform cursor-pointer mb-4">
          <span className="text-[28px] flex-shrink-0">🎁</span>
          <div className="text-left">
            <strong className="text-sm font-semibold text-[#F8EED8] block mb-0.5">Cupom de Desconto</strong>
            <span className="text-xs text-[#F8EED8]/50">Use <strong className="text-gold">OFF50</strong> na primeira mensalidade</span>
          </div>
          <span className="ml-auto text-gold text-base">›</span>
        </div>

        <div className="text-center py-2.5">
          <p className="text-xs text-[#F8EED8]/50 leading-relaxed italic">
            "Buscai primeiro o Reino de Deus e a sua justiça,<br />e todas essas coisas vos serão acrescentadas."<br />
            <span className="text-gold font-semibold not-italic">— Mateus 6:33</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
