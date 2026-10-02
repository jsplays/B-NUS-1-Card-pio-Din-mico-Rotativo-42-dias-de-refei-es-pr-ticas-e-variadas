import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Clock, 
  Hand, 
  Check, 
  Plus, 
  Minus, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  PORTIONS_GUIDE, 
  FLEXIBLE_SCHEDULE, 
  HYDRATION_CHECKLIST, 
  APP_IMAGES 
} from '../data/cardapioData';

export const HydrationRoutineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hydration' | 'portions' | 'schedule'>('hydration');

  // Water Tracker (8 glasses of 250ml = 2000ml)
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cardapio_water_glasses');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [hydrationChecked, setHydrationChecked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cardapio_hydration_checks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleGlassChange = (delta: number) => {
    const updated = Math.max(0, Math.min(16, waterGlasses + delta));
    setWaterGlasses(updated);
    localStorage.setItem('cardapio_water_glasses', updated.toString());
  };

  const handleResetGlasses = () => {
    setWaterGlasses(0);
    localStorage.setItem('cardapio_water_glasses', '0');
  };

  const toggleChecklist = (item: string) => {
    setHydrationChecked((prev) => {
      const updated = prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item];
      localStorage.setItem('cardapio_hydration_checks', JSON.stringify(updated));
      return updated;
    });
  };

  const totalMl = waterGlasses * 250;
  const targetGlasses = 8;
  const progressPercent = Math.min(100, Math.round((waterGlasses / targetGlasses) * 100));

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto w-full max-w-full overflow-x-hidden">
      {/* Visual Header */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs h-36">
        <img
          src={APP_IMAGES.hydration}
          alt="Água fresca com limão e hortelã"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">
            Equilíbrio Fisiológico
          </span>
          <h2 className="text-lg font-bold">Hidratação, Porções & Horários</h2>
          <p className="text-xs text-stone-200">
            Aprenda a comer com calma e beber água ao longo de todo o dia.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-stone-200/70 rounded-xl">
        <button
          onClick={() => setActiveTab('hydration')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'hydration'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Hidratação Diária
        </button>
        <button
          onClick={() => setActiveTab('portions')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'portions'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Porções Visuais
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'schedule'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Horários Flexíveis
        </button>
      </div>

      {/* 1. HIDRATAÇÃO */}
      {activeTab === 'hydration' && (
        <div className="space-y-4">
          {/* Water Glass Counter Card */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Registro de Água de Hoje</h3>
                  <span className="text-xs text-stone-500">Meta recomendada de referência: 2 Litros</span>
                </div>
              </div>
              <button
                onClick={handleResetGlasses}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
                title="Reiniciar contador"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Glasses Visual & Counter */}
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100 flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-teal-900 tabular-nums">
                  {totalMl} <span className="text-sm font-semibold text-teal-700">ml</span>
                </span>
                <p className="text-xs text-teal-800 font-medium">
                  {waterGlasses} de {targetGlasses} copos (250 ml cada)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGlassChange(-1)}
                  disabled={waterGlasses === 0}
                  className="w-10 h-10 rounded-xl bg-white border border-teal-200 text-teal-800 font-bold flex items-center justify-center disabled:opacity-40 hover:bg-teal-100 transition-colors shadow-xs"
                  aria-label="Diminuir um copo"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleGlassChange(1)}
                  className="w-11 h-11 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center hover:bg-teal-800 transition-colors shadow-sm"
                  aria-label="Adicionar um copo de água"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>0 ml</span>
                <span className="text-teal-700 font-bold">{progressPercent}%</span>
                <span>2000 ml+</span>
              </div>
            </div>
          </div>

          {/* Hydration Checklist */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-900">Checklist Diário de Hidratação</h4>
              <span className="text-[11px] text-stone-500 tabular-nums">
                {hydrationChecked.length}/{HYDRATION_CHECKLIST.length}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {HYDRATION_CHECKLIST.map((item, idx) => {
                const isChecked = hydrationChecked.includes(item);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(item)}
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                      isChecked ? 'bg-teal-50/30' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-teal-600 border-teal-600 text-white'
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
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hydration Medical Caveat */}
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-stone-800">
              <ShieldAlert className="w-4 h-4 text-stone-700" />
              <span>Atenção a Condições Especiais:</span>
            </div>
            <p>
              A necessidade de líquidos varia com clima, suor, intensidade de treinos e rotina. Pessoas com doenças renais, cardíacas, hepáticas ou sob restrição médica de líquidos devem seguir rigorosamente a quantidade indicada por seu médico.
            </p>
          </div>
        </div>
      )}

      {/* 2. PORÇÕES PRÁTICAS */}
      {activeTab === 'portions' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Hand className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Porções Práticas Sem Balança</h3>
                <p className="text-xs text-stone-500">Use suas mãos como referência simples</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Não é necessário pesar todos os alimentos para fazer boas escolhas. Use estas referências como ponto de partida e ajuste conforme sua fome e rotina.
            </p>
          </div>

          {/* Balanced plate image */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xs">
            <img
              src={APP_IMAGES.balancedPlate}
              alt="Prato saudável balanceado"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover"
            />
          </div>

          {/* Portions Cards */}
          <div className="space-y-2.5">
            {PORTIONS_GUIDE.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.group}
                  </span>
                  <span className="text-xs font-semibold text-stone-800">
                    {item.visual}
                  </span>
                </div>
                <p className="text-xs text-stone-500 pl-1">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
            <span className="font-bold">Nota de Individualidade:</span>
            <p className="text-[11px] text-amber-950/80">
              Pessoas que treinam intensamente, realizam trabalho físico braçal, estão grávidas ou amamentando demandam maior aporte energético. Ajuste sem culpa.
            </p>
          </div>
        </div>
      )}

      {/* 3. HORÁRIOS FLEXÍVEIS */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Horários Flexíveis</h3>
                <p className="text-xs text-stone-500">Adapte à sua realidade diária</p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Não é necessário seguir horários exatos. Use os exemplos apenas para criar um ritmo que evite picos de fome extrema.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
            {FLEXIBLE_SCHEDULE.map((slot, idx) => (
              <div key={idx} className="p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900">{slot.meal}</span>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {slot.window}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  {slot.note}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1">
            <span className="font-bold text-stone-900">Regra de Ouro:</span>
            <p>
              O mais importante é evitar longos períodos em jejum involuntário quando isso resultar em compulsão alimentar e pouca capacidade de escolha no final do dia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
