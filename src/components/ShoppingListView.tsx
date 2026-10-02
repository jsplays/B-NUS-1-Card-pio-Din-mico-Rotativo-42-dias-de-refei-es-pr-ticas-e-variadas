import React, { useState } from 'react';
import { 
  Check, 
  Plus, 
  RotateCcw, 
  Copy, 
  ShoppingBag, 
  Sparkles,
  Share2,
  Trash2
} from 'lucide-react';
import { SHOPPING_LIST_WEEK1 } from '../data/cardapioData';

interface ShoppingListViewProps {
  checkedItems: string[];
  onToggleItem: (item: string) => void;
  customItems: string[];
  onAddCustomItem: (item: string) => void;
  onRemoveCustomItem: (item: string) => void;
  onResetList: () => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  checkedItems,
  onToggleItem,
  customItems,
  onAddCustomItem,
  onRemoveCustomItem,
  onResetList,
}) => {
  const [newItemText, setNewItemText] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute total items
  const baseItems = SHOPPING_LIST_WEEK1.flatMap((cat) => cat.items);
  const allItems = [...baseItems, ...customItems];
  const totalCount = allItems.length;
  const boughtCount = allItems.filter((i) => checkedItems.includes(i)).length;
  const progressPercent = totalCount > 0 ? Math.round((boughtCount / totalCount) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAddCustomItem(newItemText.trim());
      setNewItemText('');
    }
  };

  const handleCopyList = () => {
    let text = `🛒 LISTA DE COMPRAS — CARDÁPIO DINÂMICO ROTATIVO (Semana 1)\n\n`;
    SHOPPING_LIST_WEEK1.forEach((cat) => {
      text += `📌 ${cat.name}:\n`;
      cat.items.forEach((item) => {
        const isDone = checkedItems.includes(item);
        text += `  [${isDone ? 'X' : ' '}] ${item}\n`;
      });
      text += `\n`;
    });

    if (customItems.length > 0) {
      text += `📌 Meus Itens Extras:\n`;
      customItems.forEach((item) => {
        const isDone = checkedItems.includes(item);
        text += `  [${isDone ? 'X' : ' '}] ${item}\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto w-full max-w-full overflow-x-hidden">
      {/* Header Info Banner */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Lista de Compras</h2>
              <span className="text-xs text-stone-500">Semana 1 — Base para o cardápio</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyList}
              className="h-8 px-2.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 text-xs font-medium flex items-center gap-1.5 hover:bg-stone-50"
              title="Copiar lista para o WhatsApp ou notas"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={onResetList}
              className="h-8 w-8 rounded-lg border border-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center hover:bg-stone-50"
              title="Desmarcar todos os itens"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-stone-600 font-medium">Progresso das compras</span>
            <span className="text-emerald-700 font-bold tabular-nums">
              {boughtCount} de {totalCount} itens ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Custom Item Input */}
      <form onSubmit={handleAddSubmit} className="flex gap-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Adicionar outro item (ex: azeite extra virgem)..."
          className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </form>

      {/* Shopping Categories */}
      <div className="space-y-3">
        {SHOPPING_LIST_WEEK1.map((cat) => {
          const categoryBought = cat.items.filter((i) => checkedItems.includes(i)).length;
          const isCategoryAllDone = categoryBought === cat.items.length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
            >
              {/* Category Header */}
              <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-stone-800">{cat.name}</span>
                  {isCategoryAllDone && (
                    <span className="text-[10px] text-emerald-700 font-semibold">Completo ✓</span>
                  )}
                </div>
                <span className="text-[11px] text-stone-500 tabular-nums">
                  {categoryBought}/{cat.items.length}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-stone-100">
                {cat.items.map((item) => {
                  const isChecked = checkedItems.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => onToggleItem(item)}
                      className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked ? 'bg-emerald-50/30' : 'hover:bg-stone-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span
                          className={`text-xs ${
                            isChecked
                              ? 'line-through text-stone-400 font-normal'
                              : 'text-stone-800 font-medium'
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Custom Items Category if exists */}
        {customItems.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
              <span className="font-bold text-xs text-stone-800">Meus Itens Extras</span>
              <span className="text-[11px] text-stone-500 tabular-nums">
                {customItems.filter((i) => checkedItems.includes(i)).length}/{customItems.length}
              </span>
            </div>
            <div className="divide-y divide-stone-100">
              {customItems.map((item) => {
                const isChecked = checkedItems.includes(item);
                return (
                  <div
                    key={item}
                    className={`px-4 py-2.5 flex items-center justify-between transition-colors ${
                      isChecked ? 'bg-emerald-50/30' : 'hover:bg-stone-50/60'
                    }`}
                  >
                    <div 
                      onClick={() => onToggleItem(item)}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-xs ${
                          isChecked
                            ? 'line-through text-stone-400 font-normal'
                            : 'text-stone-800 font-medium'
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveCustomItem(item)}
                      className="p-1 text-stone-400 hover:text-red-600 rounded-md"
                      title="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Helpful shopping tips */}
      <div className="p-4 rounded-2xl bg-stone-100/70 border border-stone-200 text-xs text-stone-600 space-y-1">
        <p className="font-bold text-stone-800">Dica de Economia & Praticidade:</p>
        <p>Priorize vegetais e frutas da estação na feira livre ou hortifrúti. Ovos, feijão e sardinha oferecem excelente densidade nutricional com custo acessível.</p>
      </div>
    </div>
  );
};
