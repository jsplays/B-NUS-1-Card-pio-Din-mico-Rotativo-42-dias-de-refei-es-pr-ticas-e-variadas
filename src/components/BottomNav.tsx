import React from 'react';
import { CalendarDays, ShoppingBag, Utensils, Droplets, CheckCircle2 } from 'lucide-react';

export type TabId = 'cardapio' | 'compras' | 'preparo' | 'rotina' | 'habitos';

interface BottomNavProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  completedDaysCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  completedDaysCount,
}) => {
  const tabs = [
    {
      id: 'cardapio' as TabId,
      label: 'Cardápio',
      icon: CalendarDays,
      badge: `${completedDaysCount}/42`,
    },
    {
      id: 'compras' as TabId,
      label: 'Compras',
      icon: ShoppingBag,
    },
    {
      id: 'preparo' as TabId,
      label: 'Preparo',
      icon: Utensils,
    },
    {
      id: 'rotina' as TabId,
      label: 'Água & Guia',
      icon: Droplets,
    },
    {
      id: 'habitos' as TabId,
      label: 'Hábitos',
      icon: CheckCircle2,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-lg w-full max-w-full overflow-hidden">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors relative min-w-0 ${
                isActive
                  ? 'text-emerald-700 font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative inline-flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1 rounded-full border border-emerald-200 pointer-events-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-full px-0.5">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
