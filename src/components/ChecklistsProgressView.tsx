import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  Trophy, 
  Save, 
  Check, 
  RotateCcw, 
  BookOpen, 
  HeartHandshake,
  MessageSquareHeart
} from 'lucide-react';
import { WEEKLY_HABITS } from '../data/cardapioData';
import { ReflectionAnswers } from '../types';

interface ChecklistsProgressViewProps {
  completedDays: number[];
}

export const ChecklistsProgressView: React.FC<ChecklistsProgressViewProps> = ({
  completedDays,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [habitChecks, setHabitChecks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cardapio_habits_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [reflection, setReflection] = useState<ReflectionAnswers>(() => {
    try {
      const saved = localStorage.getItem('cardapio_reflection_answers');
      return saved
        ? JSON.parse(saved)
        : { q1: '', q2: '', q3: '', q4: '', q5: '' };
    } catch {
      return { q1: '', q2: '', q3: '', q4: '', q5: '' };
    }
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const toggleHabit = (habitId: string) => {
    setHabitChecks((prev) => {
      const updated = { ...prev, [habitId]: !prev[habitId] };
      localStorage.setItem('cardapio_habits_checks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...reflection,
      savedAt: new Date().toLocaleDateString('pt-BR'),
    };
    setReflection(updated);
    localStorage.setItem('cardapio_reflection_answers', JSON.stringify(updated));
    setSaveStatus('Suas reflexões foram salvas com sucesso!');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const currentWeekHabits = WEEKLY_HABITS.find((w) => w.week === selectedWeek) || WEEKLY_HABITS[0];
  const weekCheckedCount = currentWeekHabits.items.filter((item) => habitChecks[`w${selectedWeek}_${item}`]).length;

  const totalDaysCompleted = completedDays.length;
  const progressPercent = Math.round((totalDaysCompleted / 42) * 100);

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto w-full max-w-full overflow-x-hidden">
      {/* 42 Days Overall Progress Card */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Progresso dos 42 Dias</h2>
              <span className="text-xs text-stone-500">Desenvolvimento de consistência</span>
            </div>
          </div>
          <span className="text-sm font-extrabold text-emerald-700 tabular-nums">
            {totalDaysCompleted}/42 Dias
          </span>
        </div>

        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-0.5">
          <span>{progressPercent}% da jornada percorrida</span>
          <span className="font-semibold text-stone-700">
            {totalDaysCompleted >= 42 ? '🏆 Jornada Completa!' : `${42 - totalDaysCompleted} dias restantes`}
          </span>
        </div>
      </div>

      {/* Week Selector for Habits */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-stone-900">Checklist Semanal de Hábitos</span>
          <span className="text-[11px] text-stone-500">
            {weekCheckedCount} de {currentWeekHabits.items.length} concluídos
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1">
          {WEEKLY_HABITS.map((w) => {
            const isSelected = selectedWeek === w.week;
            return (
              <button
                key={w.week}
                onClick={() => setSelectedWeek(w.week)}
                className={`py-2 px-1 text-center rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 font-medium'
                }`}
              >
                Sem {w.week}
              </button>
            );
          })}
        </div>

        {/* Current Week Items */}
        <div className="space-y-1.5 pt-1">
          <h4 className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg">
            {currentWeekHabits.title}
          </h4>

          <div className="divide-y divide-stone-100">
            {currentWeekHabits.items.map((habit, idx) => {
              const habitId = `w${selectedWeek}_${habit}`;
              const isChecked = !!habitChecks[habitId];

              return (
                <div
                  key={idx}
                  onClick={() => toggleHabit(habitId)}
                  className={`py-2.5 px-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                    isChecked ? 'bg-emerald-50/40' : 'hover:bg-stone-50'
                  }`}
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
                      isChecked ? 'line-through text-stone-400 font-normal' : 'text-stone-800 font-medium'
                    }`}
                  >
                    {habit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 42nd Day Reflection Form */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <MessageSquareHeart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900">Reflexão do 42º Dia</h3>
            <p className="text-xs text-stone-500">Escolha os hábitos que continuarão na sua vida</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          No encerramento dos 42 dias, reserve alguns minutos para responder com sinceridade. Essas respostas ajudam você a ancorar o que realmente funcionou para sua rotina.
        </p>

        <form onSubmit={handleSaveReflection} className="space-y-3 pt-1">
          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-1">
              1. Qual refeição ficou mais fácil de organizar?
            </label>
            <input
              type="text"
              value={reflection.q1}
              onChange={(e) => setReflection({ ...reflection, q1: e.target.value })}
              placeholder="Ex: O almoço com marmita planejada..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-1">
              2. Qual alimento você passou a consumir mais?
            </label>
            <input
              type="text"
              value={reflection.q2}
              onChange={(e) => setReflection({ ...reflection, q2: e.target.value })}
              placeholder="Ex: Frutas no lanche e feijão/lentilha..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-1">
              3. Qual preparo deseja repetir?
            </label>
            <input
              type="text"
              value={reflection.q3}
              onChange={(e) => setReflection({ ...reflection, q3: e.target.value })}
              placeholder="Ex: Creme de abóbora com frango e salada de grão-de-bico..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-1">
              4. O que dificultou sua rotina?
            </label>
            <input
              type="text"
              value={reflection.q4}
              onChange={(e) => setReflection({ ...reflection, q4: e.target.value })}
              placeholder="Ex: Dias com reuniões até mais tarde..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-1">
              5. Quais cinco hábitos você deseja manter?
            </label>
            <textarea
              rows={3}
              value={reflection.q5}
              onChange={(e) => setReflection({ ...reflection, q5: e.target.value })}
              placeholder="Ex: 1. Beber água de manhã | 2. Feijão pronto congelado | 3. Fruta visível..."
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-stone-800 resize-none"
            />
          </div>

          {reflection.savedAt && (
            <p className="text-[11px] text-stone-400">
              Última atualização salva em: {reflection.savedAt}
            </p>
          )}

          {saveStatus && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{saveStatus}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Minhas Reflexões</span>
          </button>
        </form>
      </div>

      {/* Bonus Final Message */}
      <div className="p-4 rounded-2xl bg-stone-100/90 border border-stone-200 text-xs text-stone-700 space-y-2">
        <h4 className="font-bold text-stone-900 text-sm">Depois dos 42 Dias</h4>
        <p className="leading-relaxed">
          Você não precisa repetir este cardápio exatamente depois dos 42 dias. Use a estrutura como uma base: escolha uma proteína, um carboidrato, vegetais e uma fruta. Faça substituições conforme sua rotina, seu orçamento e seus gostos.
        </p>
        <p className="font-medium text-emerald-800">
          O melhor cardápio é aquele que você consegue repetir de maneira flexível, prazerosa e segura.
        </p>
      </div>
    </div>
  );
};
