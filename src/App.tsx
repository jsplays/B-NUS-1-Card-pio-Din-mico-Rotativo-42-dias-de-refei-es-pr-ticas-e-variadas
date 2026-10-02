/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabId } from './components/BottomNav';
import { CardapioView } from './components/CardapioView';
import { ShoppingListView } from './components/ShoppingListView';
import { MealPrepRecipesView } from './components/MealPrepRecipesView';
import { HydrationRoutineView } from './components/HydrationRoutineView';
import { ChecklistsProgressView } from './components/ChecklistsProgressView';
import { DisclaimerModal } from './components/DisclaimerModal';
import { SubstitutionDrawer } from './components/SubstitutionDrawer';
import { PrintableView } from './components/PrintableView';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('cardapio');
  
  // Current active day
  const [currentDay, setCurrentDay] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cardapio_current_day');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Completed Days List
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('cardapio_completed_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Shopping List Checked Items
  const [checkedShoppingItems, setCheckedShoppingItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cardapio_shopping_checked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom Shopping Items
  const [customShoppingItems, setCustomShoppingItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cardapio_shopping_custom');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(() => {
    try {
      const seen = localStorage.getItem('cardapio_disclaimer_seen');
      return !seen; // Show on first visit
    } catch {
      return true;
    }
  });

  const [isSubstitutionOpen, setIsSubstitutionOpen] = useState(false);
  const [substitutionMealContext, setSubstitutionMealContext] = useState<string | undefined>();
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync current day to localStorage
  const handleSelectDay = (day: number) => {
    setCurrentDay(day);
    localStorage.setItem('cardapio_current_day', day.toString());
  };

  // Toggle Day Completed
  const handleToggleCompleteDay = (day: number) => {
    setCompletedDays((prev) => {
      const updated = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      localStorage.setItem('cardapio_completed_days', JSON.stringify(updated));
      return updated;
    });
  };

  // Shopping list item toggles
  const handleToggleShoppingItem = (item: string) => {
    setCheckedShoppingItems((prev) => {
      const updated = prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item];
      localStorage.setItem('cardapio_shopping_checked', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCustomShoppingItem = (item: string) => {
    setCustomShoppingItems((prev) => {
      if (prev.includes(item)) return prev;
      const updated = [...prev, item];
      localStorage.setItem('cardapio_shopping_custom', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveCustomShoppingItem = (item: string) => {
    setCustomShoppingItems((prev) => {
      const updated = prev.filter((i) => i !== item);
      localStorage.setItem('cardapio_shopping_custom', JSON.stringify(updated));
      return updated;
    });
    // Also remove from checked if it was checked
    setCheckedShoppingItems((prev) => {
      const updated = prev.filter((i) => i !== item);
      localStorage.setItem('cardapio_shopping_checked', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetShoppingList = () => {
    setCheckedShoppingItems([]);
    localStorage.removeItem('cardapio_shopping_checked');
  };

  const handleCloseDisclaimer = () => {
    setIsDisclaimerOpen(false);
    localStorage.setItem('cardapio_disclaimer_seen', 'true');
  };

  const handleOpenSubstitutions = (mealContext?: string) => {
    setSubstitutionMealContext(mealContext);
    setIsSubstitutionOpen(true);
  };

  // If in printable view mode
  if (isPrintOpen) {
    return <PrintableView onBack={() => setIsPrintOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950 w-full max-w-full overflow-x-hidden">
      {/* Mobile-constrained wrapper for desktop centering, fluid on mobile */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-stone-50 border-x border-stone-200/80 shadow-xl relative overflow-x-hidden">
        
        {/* App Top Bar */}
        <Header
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          onOpenPrint={() => setIsPrintOpen(true)}
          onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
          isSearchOpen={isSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Persistent subtle health badge ticker */}
        <div className="bg-amber-50/80 border-b border-amber-200/50 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-amber-900 w-full overflow-hidden">
          <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Material educativo · Não substitui consulta profissional</span>
          </div>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="text-[10px] font-bold text-amber-700 hover:text-amber-950 underline shrink-0 ml-2 whitespace-nowrap"
          >
            Ler aviso
          </button>
        </div>

        {/* Main Scrollable Content */}
        <main className="flex-1 p-3.5 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full">
          {activeTab === 'cardapio' && (
            <CardapioView
              currentDay={currentDay}
              onSelectDay={handleSelectDay}
              completedDays={completedDays}
              onToggleCompleteDay={handleToggleCompleteDay}
              onOpenSubstitutions={handleOpenSubstitutions}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}

          {activeTab === 'compras' && (
            <ShoppingListView
              checkedItems={checkedShoppingItems}
              onToggleItem={handleToggleShoppingItem}
              customItems={customShoppingItems}
              onAddCustomItem={handleAddCustomShoppingItem}
              onRemoveCustomItem={handleRemoveCustomShoppingItem}
              onResetList={handleResetShoppingList}
            />
          )}

          {activeTab === 'preparo' && (
            <MealPrepRecipesView />
          )}

          {activeTab === 'rotina' && (
            <HydrationRoutineView />
          )}

          {activeTab === 'habitos' && (
            <ChecklistsProgressView completedDays={completedDays} />
          )}
        </main>

        {/* Bottom Ergonomic Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          completedDaysCount={completedDays.length}
        />
      </div>

      {/* Health Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={handleCloseDisclaimer}
      />

      {/* Food Substitution Drawer */}
      <SubstitutionDrawer
        isOpen={isSubstitutionOpen}
        onClose={() => setIsSubstitutionOpen(false)}
        selectedMealContext={substitutionMealContext}
      />
    </div>
  );
}
