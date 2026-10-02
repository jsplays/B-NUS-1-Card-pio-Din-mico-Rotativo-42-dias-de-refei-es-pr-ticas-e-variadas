import React, { useState } from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  ShieldAlert, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { 
  DAYS_DATA, 
  WEEKS_DATA, 
  SHOPPING_LIST_WEEK1, 
  RECIPES_DATA, 
  EMERGENCY_MEALS,
  PORTIONS_GUIDE,
  FLEXIBLE_SCHEDULE,
  WEEKLY_HABITS,
  HEALTH_DISCLAIMER_TEXT
} from '../data/cardapioData';
import { 
  downloadStandaloneHtmlFile, 
  downloadMarkdownFile, 
  getFullMarkdownText 
} from '../utils/printExport';

interface PrintableViewProps {
  onBack: () => void;
}

export const PrintableView: React.FC<PrintableViewProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);

  const handlePrint = () => {
    try {
      window.print();
      setPrintFeedback('Diálogo de impressão acionado! Caso seu navegador bloqueie janelas no preview, utilize o botão "Baixar Arquivo HTML/PDF".');
      setTimeout(() => setPrintFeedback(null), 6000);
    } catch (err) {
      console.warn('Impressão direta restrita pelo navegador:', err);
      setPrintFeedback('Seu navegador bloqueou o comando de impressão direto nesta janela. Baixando arquivo HTML pronto para salvar em PDF...');
      downloadStandaloneHtmlFile();
      setTimeout(() => setPrintFeedback(null), 6000);
    }
  };

  const handleCopyCanvaText = () => {
    const text = getFullMarkdownText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen text-stone-900 pb-20 w-full max-w-full overflow-x-hidden">
      {/* Top Action Bar (hidden when printing) */}
      <div className="sticky top-0 z-50 bg-stone-900 text-white px-3 sm:px-4 py-3 shadow-md print:hidden w-full max-w-full overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-white px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao App</span>
          </button>

          {/* Action Buttons Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy for Canva */}
            <button
              onClick={handleCopyCanvaText}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 px-3 py-2 rounded-xl border border-stone-700 transition-colors"
              title="Copiar todo o conteúdo formatado para colar no Canva ou Word"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado para o Canva!' : 'Copiar p/ Canva'}</span>
            </button>

            {/* Download Standalone HTML file */}
            <button
              onClick={downloadStandaloneHtmlFile}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 px-3 py-2 rounded-xl border border-stone-700 transition-colors"
              title="Baixar arquivo HTML para abrir e salvar em PDF"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Arquivo PDF/HTML</span>
            </button>

            {/* Trigger Direct Print */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 rounded-xl shadow-sm transition-colors"
              title="Abrir diálogo de impressão do navegador"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Agora</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating feedback message if print dialog blocked or triggered */}
      {printFeedback && (
        <div className="max-w-3xl mx-auto px-4 mt-3 print:hidden">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 animate-fade-in shadow-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{printFeedback}</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Dica: Você pode salvar em PDF abrindo o arquivo baixado ou pressionando <strong>Ctrl + P</strong> no teclado.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Help Banner for Printing & Canva */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-6 print:hidden">
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-700">
          <div>
            <span className="font-bold text-stone-900 block text-sm">
              Opções de Impressão e Canva:
            </span>
            <p className="text-stone-500 mt-0.5">
              1. <strong>Imprimir Agora</strong>: Aciona o diálogo de impressão nativo do seu navegador.<br />
              2. <strong>Baixar Arquivo PDF/HTML</strong>: Salva o documento completo para imprimir fora do preview.<br />
              3. <strong>Copiar p/ Canva</strong>: Copia todo o texto das 15 páginas formatado para colar direto no Canva.
            </p>
          </div>
          <button
            onClick={downloadStandaloneHtmlFile}
            className="px-3.5 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-semibold flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Arquivo</span>
          </button>
        </div>
      </div>

      {/* Document Body */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6 space-y-10 text-stone-800 leading-relaxed font-sans">
        
        {/* CAPA & TÍTULO */}
        <section className="text-center py-8 border-b border-stone-200 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            BÔNUS 1 — GUIA COMPLETO
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Cardápio Dinâmico Rotativo
          </h1>
          <p className="text-base text-stone-600 font-medium max-w-xl mx-auto">
            42 dias de refeições práticas e variadas. Coma melhor sem depender de receitas complicadas ou ingredientes difíceis.
          </p>
          <div className="pt-2 text-xs text-stone-500 italic">
            "Planejamento simples. Comida de verdade. Mais tranquilidade para comer bem."
          </div>
        </section>

        {/* AVISO IMPORTANTE OBRIGATÓRIO */}
        <section className="p-6 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <h2>{HEALTH_DISCLAIMER_TEXT.title}</h2>
          </div>
          {HEALTH_DISCLAIMER_TEXT.paragraphs.map((p, i) => (
            <p key={i} className="text-xs text-amber-950 leading-relaxed">
              {p}
            </p>
          ))}
        </section>

        {/* COMO USAR ESTE CARDÁPIO */}
        <section className="space-y-4 border-b border-stone-200 pb-8">
          <h2 className="text-xl font-bold text-stone-900">Como usar este cardápio</h2>
          <p className="text-sm text-stone-700">
            Este material apresenta sugestões para 42 dias. Você não precisa seguir os horários de forma rígida nem consumir todas as refeições sugeridas. Use o cardápio de acordo com sua fome, rotina e disponibilidade.
          </p>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-sm space-y-2">
            <span className="font-bold text-stone-800 block">Em cada refeição principal, procure combinar:</span>
            <ul className="list-disc list-inside space-y-1 text-stone-700 text-xs sm:text-sm pl-1">
              <li>Uma fonte de proteína;</li>
              <li>Uma fonte de carboidrato;</li>
              <li>Legumes ou verduras;</li>
              <li>Uma fruta em algum momento do dia;</li>
              <li>Água ao longo da rotina.</li>
            </ul>
          </div>
          <p className="text-xs text-stone-600">
            O lanche da manhã e o lanche da tarde são opcionais. Se você não estiver com fome, pode não fazer o lanche. Se sentir fome entre as refeições, escolha uma das opções sugeridas. As quantidades devem ser ajustadas conforme sua fome, seus objetivos e sua orientação profissional.
          </p>
        </section>

        {/* PORÇÕES PRÁTICAS */}
        <section className="space-y-4 border-b border-stone-200 pb-8">
          <h2 className="text-xl font-bold text-stone-900">Porções Práticas Sem Balança</h2>
          <p className="text-xs text-stone-600">
            Use estas referências visuais como ponto de partida:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-2.5">Grupo alimentar</th>
                  <th className="p-2.5">Referência visual</th>
                  <th className="p-2.5">Observação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {PORTIONS_GUIDE.map((p, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                    <td className="p-2.5 font-bold text-stone-900">{p.group}</td>
                    <td className="p-2.5 font-medium text-emerald-800">{p.visual}</td>
                    <td className="p-2.5 text-stone-600">{p.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6 SEMANAS DE CARDÁPIO COMPLETO (42 DIAS) */}
        <section className="space-y-8 border-b border-stone-200 pb-8">
          <h2 className="text-2xl font-bold text-stone-900">Cardápio Completo de 42 Dias</h2>

          {WEEKS_DATA.map((week) => {
            const weekDays = DAYS_DATA.filter((d) => d.week === week.week);

            return (
              <div key={week.week} className="space-y-3 page-break-inside-avoid">
                <div className="bg-emerald-800 text-white p-3 rounded-xl flex items-center justify-between">
                  <h3 className="text-sm font-bold">
                    Semana {week.week} — {week.theme}
                  </h3>
                  <span className="text-xs text-emerald-100">
                    Objetivo: {week.objective}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden">
                    <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-2 w-12 text-center">Dia</th>
                        <th className="p-2">Café da manhã</th>
                        <th className="p-2">Lanche M</th>
                        <th className="p-2">Almoço</th>
                        <th className="p-2">Lanche T</th>
                        <th className="p-2">Jantar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {weekDays.map((day) => (
                        <tr key={day.day} className={day.day % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                          <td className="p-2 font-bold text-center text-stone-900">{day.day}</td>
                          <td className="p-2">{day.cafe}</td>
                          <td className="p-2 text-stone-600">{day.lancheManha}</td>
                          <td className="p-2 font-medium text-stone-900">{day.almoco}</td>
                          <td className="p-2 text-stone-600">{day.lancheTarde}</td>
                          <td className="p-2 font-medium text-stone-900">{day.jantar}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {week.highlightItems && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                    <strong className="text-stone-900">{week.highlightTitle}:</strong>{' '}
                    {week.highlightItems.join(' · ')}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* HORÁRIOS FLEXÍVEIS & HIDRATAÇÃO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stone-900">Horários Flexíveis</h3>
            <table className="w-full text-xs border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-100 font-bold">
                <tr>
                  <th className="p-2 text-left">Momento</th>
                  <th className="p-2 text-left">Horário</th>
                  <th className="p-2 text-left">Observação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {FLEXIBLE_SCHEDULE.map((s, i) => (
                  <tr key={i}>
                    <td className="p-2 font-semibold">{s.meal}</td>
                    <td className="p-2 text-emerald-800">{s.window}</td>
                    <td className="p-2 text-stone-500">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stone-900">Diretrizes de Hidratação</h3>
            <p className="text-xs text-stone-600">
              A necessidade varia com clima, suor e rotina. Deixe uma garrafa acessível e beba água ao longo do dia sem forçar grandes volumes de uma vez.
            </p>
            <ul className="text-xs space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-700">
              <li>✓ Bebi água pela manhã</li>
              <li>✓ Levei água para o trabalho ou estudo</li>
              <li>✓ Bebi água durante o almoço</li>
              <li>✓ Bebi água durante a tarde</li>
              <li>✓ Bebi água após atividade física</li>
              <li>✓ Observei minha sede sem exagerar</li>
            </ul>
          </div>
        </section>

        {/* LISTA DE COMPRAS SEMANA 1 */}
        <section className="space-y-4 border-b border-stone-200 pb-8">
          <h2 className="text-xl font-bold text-stone-900">Lista de Compras da Semana 1</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            {SHOPPING_LIST_WEEK1.map((cat) => (
              <div key={cat.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1 text-xs border-b border-stone-200 pb-1">
                  {cat.name}
                </span>
                <ul className="space-y-0.5 text-stone-700">
                  {cat.items.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* RECEITAS PRÁTICAS & PREPARO */}
        <section className="space-y-4 border-b border-stone-200 pb-8">
          <h2 className="text-xl font-bold text-stone-900">Preparo Rápido de Refeições</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {RECIPES_DATA.map((r) => (
              <div key={r.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-stone-900 text-sm">{r.title}</h4>
                  <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {r.time}
                  </span>
                </div>
                <p className="text-stone-600">
                  <strong>Ingredientes:</strong> {r.ingredients.join(', ')}
                </p>
                <p className="text-stone-700">
                  <strong>Preparo:</strong> {r.instructions}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CHECKLIST IMPRIMÍVEL POR SEMANA */}
        <section className="space-y-4 border-b border-stone-200 pb-8">
          <h2 className="text-xl font-bold text-stone-900">Checklist Imprimível de Hábitos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {WEEKLY_HABITS.map((wh) => (
              <div key={wh.week} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-1">
                  {wh.title}
                </h4>
                <ul className="space-y-1 text-stone-700">
                  {wh.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border border-stone-400 rounded-sm inline-block shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* TEXTO FINAL DO BÔNUS */}
        <section className="text-center py-6 space-y-2 text-stone-600 text-xs">
          <p className="font-bold text-stone-800 text-sm">
            O melhor cardápio é aquele que você consegue repetir de maneira flexível, prazerosa e segura.
          </p>
          <p>
            Você não precisa repetir este cardápio exatamente depois dos 42 dias. Use a estrutura como base e adapte ao seu estilo de vida.
          </p>
        </section>
      </div>
    </div>
  );
};
