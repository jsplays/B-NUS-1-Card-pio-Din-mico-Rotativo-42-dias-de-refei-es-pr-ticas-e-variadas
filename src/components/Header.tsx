import React from 'react';
import { AlertCircle, Printer, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenDisclaimer: () => void;
  onOpenPrint: () => void;
  onToggleSearch: () => void;
  isSearchOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDisclaimer,
  onOpenPrint,
  onToggleSearch,
  isSearchOpen,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 w-full max-w-full overflow-hidden">
      <div className="w-full px-3 sm:px-4 h-14 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="font-bold text-stone-900 text-xs sm:text-base tracking-tight truncate">
            Cardápio Rotativo
          </span>
        </div>

        {/* Zone 2 & 3: Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Search Toggle */}
          <button
            onClick={onToggleSearch}
            className={`h-8 w-8 sm:h-9 sm:w-auto sm:px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0 ${
              isSearchOpen
                ? 'bg-emerald-100 text-emerald-800'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
            title="Buscar alimentos e refeições"
            aria-label="Buscar refeição"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Buscar</span>
          </button>

          {/* Export / Print PDF View */}
          <button
            onClick={onOpenPrint}
            className="h-8 px-2 sm:h-9 sm:px-2.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
            title="Abrir página de impressão e download em PDF"
            aria-label="Imprimir ou salvar PDF"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="text-[11px] sm:text-xs">PDF</span>
          </button>

          {/* Health Disclaimer button */}
          <button
            onClick={onOpenDisclaimer}
            className="h-8 px-2 sm:h-9 sm:px-2.5 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
            title="Ver aviso importante de saúde"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-[11px] sm:text-xs">Aviso</span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <div className="bg-stone-50 border-t border-stone-200 px-4 py-2.5 animate-fade-in">
          <div className="max-w-4xl mx-auto relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar no cardápio (ex: tapioca, frango, peixe, lentilha)..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800 placeholder-stone-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-1"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
