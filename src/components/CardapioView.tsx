import React, { useState } from 'react';
import { 
  Coffee, 
  SunMedium, 
  UtensilsCrossed, 
  Sunset, 
  Moon, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeftRight,
  Info,
  Calendar,
  ShieldCheck,
  Search
} from 'lucide-react';
import { DAYS_DATA, WEEKS_DATA, APP_IMAGES } from '../data/cardapioData';
import { DayPlan } from '../types';

interface CardapioViewProps {
  currentDay: number;
  onSelectDay: (day: number) => void;
  completedDays: number[];
  onToggleCompleteDay: (day: number) => void;
  onOpenSubstitutions: (mealContext?: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CardapioView: React.FC<CardapioViewProps> = ({
  currentDay,
  onSelectDay,
  completedDays,
  onToggleCompleteDay,
  onOpenSubstitutions,
  searchQuery,
  onClearSearch,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(Math.ceil(currentDay / 7));

  const activeDayData: DayPlan = DAYS_DATA.find((d) => d.day === currentDay) || DAYS_DATA[0];
  const activeWeekData = WEEKS_DATA.find((w) => w.week === activeDayData.week) || WEEKS_DATA[0];

  const isCompleted = completedDays.includes(currentDay);

  // If search query is active, filter all days
  const filteredMeals = searchQuery.trim()
    ? DAYS_DATA.filter((day) => {
        const query = searchQuery.toLowerCase();
        return (
          day.cafe.toLowerCase().includes(query) ||
          day.lancheManha.toLowerCase().includes(query) ||
          day.almoco.toLowerCase().includes(query) ||
          day.lancheTarde.toLowerCase().includes(query) ||
          day.jantar.toLowerCase().includes(query) ||
          `dia ${day.day}`.includes(query)
        );
      })
    : null;

  const handleWeekChange = (w: number) => {
    setSelectedWeek(w);
    // select first day of that week
    const firstDayOfWeek = (w - 1) * 7 + 1;
    onSelectDay(firstDayOfWeek);
  };

  const handlePrevDay = () => {
    if (currentDay > 1) {
      const nextDay = currentDay - 1;
      onSelectDay(nextDay);
      setSelectedWeek(Math.ceil(nextDay / 7));
    }
  };

  const handleNextDay = () => {
    if (currentDay < 42) {
      const nextDay = currentDay + 1;
      onSelectDay(nextDay);
      setSelectedWeek(Math.ceil(nextDay / 7));
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto w-full max-w-full overflow-x-hidden">
      {/* If Search is Active */}
      {filteredMeals && (
        <div className="space-y-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xs w-full overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 min-w-0 truncate">
              <Search className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">Resultados para "{searchQuery}" ({filteredMeals.length})</span>
            </div>
            <button
              onClick={onClearSearch}
              className="text-xs text-emerald-700 hover:underline font-medium shrink-0 ml-2"
            >
              Voltar
            </button>
          </div>

          {filteredMeals.length === 0 ? (
            <p className="text-xs text-stone-500 py-4 text-center">
              Nenhuma refeição encontrada com o termo "{searchQuery}". Experimente buscar por "frango", "ovo", "iogurte", "lentilha", etc.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {filteredMeals.map((item) => (
                <button
                  key={item.day}
                  onClick={() => {
                    onSelectDay(item.day);
                    setSelectedWeek(item.week);
                    onClearSearch();
                  }}
                  className="w-full text-left p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-800">Dia {item.day} · Semana {item.week}</span>
                    <span className="text-stone-400">Ver cardápio completo →</span>
                  </div>
                  <div className="text-xs text-stone-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    <div><strong>Almoço:</strong> {item.almoco}</div>
                    <div><strong>Jantar:</strong> {item.jantar}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Week Selector Segmented Buttons */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-xs w-full overflow-hidden">
        <div className="flex items-center justify-between px-1 pb-1.5 text-xs text-stone-500">
          <span className="font-semibold text-stone-800">Escolha a Semana</span>
          <span className="text-[11px]">42 Dias</span>
        </div>
        <div className="grid grid-cols-6 gap-1 w-full min-w-0">
          {WEEKS_DATA.map((w) => {
            const isSelected = selectedWeek === w.week;
            const weekCompletedCount = w.days.filter((d) => completedDays.includes(d)).length;
            const isAllWeekDone = weekCompletedCount === 7;

            return (
              <button
                key={w.week}
                onClick={() => handleWeekChange(w.week)}
                className={`py-2 px-0.5 text-center rounded-xl transition-all relative min-w-0 ${
                  isSelected
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 font-medium'
                }`}
              >
                <div className="text-[9px] uppercase tracking-wider opacity-80 truncate">Sem</div>
                <div className="text-xs sm:text-sm font-bold">{w.week}</div>
                {isAllWeekDone && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Week Focus & Objective Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden w-full">
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-200 font-medium">
            <span>SEMANA {activeWeekData.week} — {activeWeekData.theme.toUpperCase()}</span>
            <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full">Dias {activeWeekData.days[0]} a {activeWeekData.days[6]}</span>
          </div>
          <h2 className="text-base font-bold tracking-tight text-white">
            {activeWeekData.objective}
          </h2>

          {activeWeekData.highlightItems && (
            <div className="pt-2 border-t border-white/15 text-xs text-emerald-100 space-y-1">
              <span className="font-semibold text-white text-[11px] block">
                {activeWeekData.highlightTitle}:
              </span>
              <ul className="space-y-0.5 text-[11px] text-emerald-100/90">
                {activeWeekData.highlightItems.slice(0, 3).map((item, i) => (
                  <li key={i} className="truncate">• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Days Horizontal Carousel for Current Week */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-stone-200 shadow-xs space-y-2 w-full overflow-hidden">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Dias da Semana {selectedWeek}</span>
          </div>
          <span className="text-[11px] text-stone-400">
            Selecione o dia
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 w-full min-w-0">
          {activeWeekData.days.map((d) => {
            const isSelected = d === currentDay;
            const isDayDone = completedDays.includes(d);

            return (
              <button
                key={d}
                onClick={() => onSelectDay(d)}
                className={`py-2 px-0.5 rounded-xl flex flex-col items-center justify-center transition-all min-w-0 ${
                  isSelected
                    ? 'bg-stone-900 text-white font-bold ring-2 ring-emerald-500 shadow-xs'
                    : isDayDone
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-100'
                }`}
              >
                <span className="text-[9px] text-stone-400">Dia</span>
                <span className="text-xs sm:text-sm font-bold">{d}</span>
                {isDayDone && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Header & Navigation */}
      <div className="flex items-center justify-between bg-stone-100/80 px-3 py-2.5 rounded-xl border border-stone-200">
        <button
          onClick={handlePrevDay}
          disabled={currentDay === 1}
          className="flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none px-2 py-1 rounded-lg"
          aria-label="Dia anterior"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="text-center">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">Cardápio do</span>
          <h3 className="text-base font-bold text-stone-900">Dia {currentDay} de 42</h3>
        </div>

        <button
          onClick={handleNextDay}
          disabled={currentDay === 42}
          className="flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none px-2 py-1 rounded-lg"
          aria-label="Próximo dia"
        >
          <span>Próximo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Complete Day Checkbox Banner */}
      <div 
        onClick={() => onToggleCompleteDay(currentDay)}
        className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-colors ${
          isCompleted 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-stone-400 shrink-0" />
          )}
          <div>
            <span className="text-xs font-bold block">
              {isCompleted ? 'Dia Concluído com Sucesso!' : 'Marcar Dia como Concluído'}
            </span>
            <span className="text-[11px] text-stone-500">
              {isCompleted ? 'Excelente consistência na rotina.' : 'Toque aqui quando finalizar as refeições de hoje.'}
            </span>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-700">
          {isCompleted ? 'Feito ✓' : 'Pendente'}
        </span>
      </div>

      {/* 5 Meal Cards */}
      <div className="space-y-3">
        {/* 1. Café da Manhã */}
        <MealCard
          icon={Coffee}
          title="Café da manhã"
          timeWindow="6h – 9h"
          mealText={activeDayData.cafe}
          color="amber"
          onOpenSub={() => onOpenSubstitutions(`Café da manhã: ${activeDayData.cafe}`)}
        />

        {/* 2. Lanche da Manhã (Opcional) */}
        <MealCard
          icon={SunMedium}
          title="Lanche da manhã"
          timeWindow="9h – 11h"
          optional
          mealText={activeDayData.lancheManha}
          color="orange"
          onOpenSub={() => onOpenSubstitutions(`Lanche da manhã: ${activeDayData.lancheManha}`)}
        />

        {/* 3. Almoço */}
        <MealCard
          icon={UtensilsCrossed}
          title="Almoço"
          timeWindow="11h30 – 14h30"
          mealText={activeDayData.almoco}
          color="emerald"
          highlight
          onOpenSub={() => onOpenSubstitutions(`Almoço: ${activeDayData.almoco}`)}
        />

        {/* 4. Lanche da Tarde (Opcional) */}
        <MealCard
          icon={Sunset}
          title="Lanche da tarde"
          timeWindow="15h – 18h"
          optional
          mealText={activeDayData.lancheTarde}
          color="blue"
          onOpenSub={() => onOpenSubstitutions(`Lanche da tarde: ${activeDayData.lancheTarde}`)}
        />

        {/* 5. Jantar */}
        <MealCard
          icon={Moon}
          title="Jantar"
          timeWindow="18h – 21h"
          mealText={activeDayData.jantar}
          color="indigo"
          highlight
          onOpenSub={() => onOpenSubstitutions(`Jantar: ${activeDayData.jantar}`)}
        />
      </div>

      {/* Golden Rule Note */}
      <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 text-xs text-stone-600 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-stone-800">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>Estrutura de cada refeição principal</span>
        </div>
        <p>
          Procure sempre combinar: <strong>uma fonte de proteína</strong> + <strong>uma fonte de carboidrato</strong> + <strong>legumes ou verduras</strong> + <strong>uma fruta no dia</strong> + <strong>água ao longo da rotina</strong>.
        </p>
        <p className="text-[11px] text-stone-500">
          Os lanches são opcionais. Se não sentir fome, você pode não lanchar. Ajuste as quantidades conforme sua necessidade pessoal.
        </p>
      </div>

      {/* Quick Action to Open Substitutions */}
      <div className="pt-1">
        <button
          onClick={() => onOpenSubstitutions()}
          className="w-full py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4 text-emerald-700" />
          <span>Ver Dicas de Substituição de Alimentos</span>
        </button>
      </div>
    </div>
  );
};

interface MealCardProps {
  icon: React.ElementType;
  title: string;
  timeWindow: string;
  mealText: string;
  color: 'amber' | 'orange' | 'emerald' | 'blue' | 'indigo';
  optional?: boolean;
  highlight?: boolean;
  onOpenSub: () => void;
}

const MealCard: React.FC<MealCardProps> = ({
  icon: Icon,
  title,
  timeWindow,
  mealText,
  color,
  optional,
  highlight,
  onOpenSub,
}) => {
  return (
    <div
      className={`p-4 rounded-2xl bg-white border transition-all ${
        highlight 
          ? 'border-emerald-200/80 shadow-xs' 
          : 'border-stone-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              color === 'amber'
                ? 'bg-amber-100 text-amber-800'
                : color === 'orange'
                ? 'bg-orange-100 text-orange-800'
                : color === 'emerald'
                ? 'bg-emerald-100 text-emerald-800'
                : color === 'blue'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-indigo-100 text-indigo-800'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-stone-900">{title}</h4>
              {optional && (
                <span className="text-[10px] text-stone-500 font-medium">
                  · Opcional
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400">{timeWindow}</span>
          </div>
        </div>

        <button
          onClick={onOpenSub}
          className="text-[11px] text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
          title="Ver o que substituir nessa refeição"
        >
          <ArrowLeftRight className="w-3 h-3" />
          <span>Trocar</span>
        </button>
      </div>

      <div className="pl-9">
        <p className="text-sm font-semibold text-stone-800 leading-snug">
          {mealText}
        </p>
      </div>
    </div>
  );
};
