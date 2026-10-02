import React from 'react';
import { AlertTriangle, X, ShieldCheck } from 'lucide-react';
import { HEALTH_DISCLAIMER_TEXT } from '../data/cardapioData';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-50/80 border-b border-amber-200/60">
          <div className="flex items-center gap-2.5 text-amber-900 font-semibold text-base">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h2 id="disclaimer-title" className="text-base font-semibold">{HEALTH_DISCLAIMER_TEXT.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
            aria-label="Fechar aviso"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-stone-700 text-sm leading-relaxed">
          {HEALTH_DISCLAIMER_TEXT.paragraphs.map((para, index) => (
            <p key={index} className="text-stone-700">
              {para}
            </p>
          ))}

          <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">Diretriz de Segurança:</p>
            <p>Se tiver condições crônicas ou dúvidas específicas, consulte sempre um médico ou nutricionista antes de grandes alterações em sua rotina alimentar.</p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            Compreendi e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};
