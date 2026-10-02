import React from 'react';
import { X, RefreshCw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PORTIONS_GUIDE } from '../data/cardapioData';

interface SubstitutionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMealContext?: string;
}

export const SubstitutionDrawer: React.FC<SubstitutionDrawerProps> = ({
  isOpen,
  onClose,
  selectedMealContext,
}) => {
  if (!isOpen) return null;

  const categories = [
    {
      group: 'Carboidratos',
      source: 'Arroz',
      substitutes: ['Batata cozida ou assada', 'Mandioca / Aipim', 'Cuscuz nordestino', 'Milho cozido', 'Massa simples / Macarrão', 'Aveia ou tapioca'],
      tip: 'Mantenha a proporção aproximada de 1 punho fechado.'
    },
    {
      group: 'Proteínas',
      source: 'Frango / Carne',
      substitutes: ['Ovos mexidos, cozidos ou pochê (2 un)', 'Peixe fresco ou congelado', 'Atum ou sardinha em lata', 'Tofu grelhado', 'Leguminosas (feijão, lentilha, grão-de-bico)'],
      tip: 'Mantenha o tamanho aproximado da palma da sua mão.'
    },
    {
      group: 'Vegetais & Saladas',
      source: 'Salada crua',
      substitutes: ['Legumes refogados (abobrinha, chuchu, cenoura)', 'Legumes assados no forno com ervas', 'Couve ou espinafre refogado', 'Sopas e cremes de legumes'],
      tip: 'Preencha metade do prato confortavelmente.'
    },
    {
      group: 'Temperos Naturais',
      source: 'Temperos prontos ultraprocessados',
      substitutes: ['Alho e cebola picadinhos', 'Suco de limão fresco', 'Páprica doce ou defumada', 'Cúrcuma (açafrão-da-terra)', 'Cheiro-verde (salsinha e cebolinha)', 'Orégano e ervas secas'],
      tip: 'Varie os temperos para criar novos sabores com a mesma base de alimentos.'
    },
    {
      group: 'Frutas da Estação',
      source: 'Fruta indicada',
      substitutes: ['Banana, maçã, mamão, laranja, pera, melão, uva ou morango'],
      tip: 'Priorize frutas da época, que são mais saborosas e econômicas na feira.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-950/50 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up"
        role="dialog"
      >
        {/* Grab Handle for Mobile */}
        <div className="w-10 h-1.5 bg-stone-300 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Guia de Substituições</h3>
              <p className="text-xs text-stone-500">Flexibilidade sem regras rígidas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-200/50"
            aria-label="Fechar guia de substituições"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {selectedMealContext && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-emerald-900 text-xs">
              <span className="font-semibold">Substituindo para: </span>
              {selectedMealContext}
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Como Variar Sem Comprar Mais
            </h4>

            {categories.map((cat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 text-sm">{cat.group}</span>
                  <span className="text-[11px] text-stone-500">Ex: {cat.source}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.substitutes.map((sub, sIdx) => (
                    <span 
                      key={sIdx}
                      className="inline-flex items-center gap-1 text-xs bg-white border border-stone-200 text-stone-700 px-2 py-1 rounded-md shadow-xs"
                    >
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      {sub}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-emerald-800 italic pt-1 border-t border-stone-200/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                  {cat.tip}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Portions Summary */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-2">
            <h5 className="font-semibold text-amber-900 text-xs flex items-center gap-1.5">
              <span>Lembrete de Porção Visual:</span>
            </h5>
            <ul className="text-xs text-amber-950/80 space-y-1">
              <li>• <strong>Proteína:</strong> palma da mão</li>
              <li>• <strong>Carboidrato:</strong> punho fechado</li>
              <li>• <strong>Vegetais:</strong> preencha metade do prato</li>
              <li>• <strong>Gorduras:</strong> pequena porção para tempero</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Entendido, Voltar ao Cardápio
          </button>
        </div>
      </div>
    </div>
  );
};
