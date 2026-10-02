import React, { useState } from 'react';
import { 
  Clock, 
  ChefHat, 
  Flame, 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp,
  PackageCheck,
  AlertTriangle
} from 'lucide-react';
import { MEAL_PREP_STEPS, RECIPES_DATA, EMERGENCY_MEALS, APP_IMAGES } from '../data/cardapioData';

export const MealPrepRecipesView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'prep' | 'recipes' | 'emergency'>('prep');
  const [completedPrepTasks, setCompletedPrepTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cardapio_prep_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [expandedRecipe, setExpandedRecipe] = useState<string | null>('omelete-basico');

  const toggleTask = (task: string) => {
    setCompletedPrepTasks((prev) => {
      const updated = prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task];
      localStorage.setItem('cardapio_prep_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto w-full max-w-full overflow-x-hidden">
      {/* Visual Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs h-36 sm:h-44">
        <img
          src={APP_IMAGES.mealPrep}
          alt="Preparo de refeições saudáveis em potes de vidro"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
            Metodologia Sem Complicações
          </span>
          <h2 className="text-lg font-bold">Preparo Inteligente & Receitas</h2>
          <p className="text-xs text-stone-200">
            Cozinhe em até 2 horas para garantir tranquilidade a semana toda.
          </p>
        </div>
      </div>

      {/* Segmented Section Switcher */}
      <div className="flex p-1 bg-stone-200/70 rounded-xl">
        <button
          onClick={() => setActiveSection('prep')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'prep'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Preparo em 2h
        </button>
        <button
          onClick={() => setActiveSection('recipes')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'recipes'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          4 Receitas Rápidas
        </button>
        <button
          onClick={() => setActiveSection('emergency')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'emergency'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          3 Emergências
        </button>
      </div>

      {/* 1. PREPARO EM ATÉ 2 HORAS */}
      {activeSection === 'prep' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Preparo em até 2 Horas</h3>
                <p className="text-xs text-stone-500">Passo a passo cronometrado em 3 blocos lógicos</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              O objetivo não é cozinhar pratos elaborados, mas sim criar bases versáteis (carboidrato pronto, feijão cozido, proteína temperada e folhas limpas).
            </p>
          </div>

          <div className="space-y-3">
            {MEAL_PREP_STEPS.map((block, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
              >
                <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900">{block.block}</h4>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  {block.tasks.map((task, tIdx) => {
                    const isDone = completedPrepTasks.includes(task);
                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleTask(task)}
                        className={`p-2.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                          isDone
                            ? 'bg-emerald-50/40 border-emerald-200 text-stone-500'
                            : 'bg-white border-stone-200/80 hover:bg-stone-50 text-stone-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                            isDone
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={`text-xs ${isDone ? 'line-through text-stone-400' : 'font-medium'}`}>
                          {task}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Segurança da Marmita */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Segurança Sanitária para Marmitas</span>
            </div>
            <p className="leading-relaxed">
              Ao transportar alimentos perecíveis, use sempre <strong>bolsa térmica com elementos refrigerantes (gelo reutilizável)</strong>.
            </p>
            <p className="text-[11px] text-amber-900/90">
              A regra sanitária de ouro: mantenha preparações <strong>quentes acima de 60 °C</strong> ou <strong>frias abaixo de 5 °C</strong>. Evite deixar alimentos prontos em temperatura ambiente por mais de 2 horas.
            </p>
          </div>
        </div>
      )}

      {/* 2. RECEITAS RÁPIDAS */}
      {activeSection === 'recipes' && (
        <div className="space-y-3">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-stone-900">Receitas Simples de Execução Rápida</span>
            </div>
            <span className="text-[11px] text-stone-400">4 opções do guia</span>
          </div>

          <div className="space-y-3">
            {RECIPES_DATA.map((recipe) => {
              const isExpanded = expandedRecipe === recipe.id;

              return (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-stone-50 text-left transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-900">{recipe.title}</h4>
                        <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full font-medium">
                          {recipe.time}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-700 font-medium block">
                        {recipe.category}
                      </span>
                    </div>

                    <div className="text-stone-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-stone-100 space-y-3 animate-fade-in text-xs">
                      <div>
                        <span className="font-bold text-stone-800 text-xs block mb-1.5">
                          Ingredientes:
                        </span>
                        <ul className="space-y-1 text-stone-600 pl-2">
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                        <span className="font-bold text-stone-800 text-xs block mb-1">
                          Modo de Preparo:
                        </span>
                        <p className="text-stone-700 leading-relaxed">
                          {recipe.instructions}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. REFEIÇÕES DE EMERGÊNCIA */}
      {activeSection === 'emergency' && (
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
            <h3 className="text-sm font-bold text-stone-900">
              Três Refeições de Emergência
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Quando não houver tempo para cozinhar: o objetivo não é preparar a refeição perfeita. É reduzir a dependência de escolhas feitas no impulso e no delivery.
            </p>
          </div>

          <div className="space-y-3">
            {EMERGENCY_MEALS.map((meal) => (
              <div
                key={meal.number}
                className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Opção {meal.number}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">{meal.title}</h4>
                </div>
                <p className="text-xs text-stone-600 pl-1 leading-relaxed">
                  {meal.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 text-center">
            <span className="font-semibold text-stone-800">Lembrete:</span> Tenha sempre ovos na geladeira, pão no freezer e sardinha ou atum na despensa.
          </div>
        </div>
      )}
    </div>
  );
};
