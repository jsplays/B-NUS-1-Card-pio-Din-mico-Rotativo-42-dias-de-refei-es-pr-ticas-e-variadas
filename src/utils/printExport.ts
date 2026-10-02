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

export function getFullMarkdownText(): string {
  let md = `# BÔNUS 1 — CARDÁPIO DINÂMICO ROTATIVO
## 42 dias de refeições práticas e variadas

**Subtítulo:** Coma melhor sem depender de receitas complicadas ou ingredientes difíceis.
**Frase de capa:** Planejamento simples. Comida de verdade. Mais tranquilidade para comer bem.

---

### AVISO IMPORTANTE
${HEALTH_DISCLAIMER_TEXT.paragraphs.join('\n\n')}

---

## Como usar este cardápio
Este material apresenta sugestões para 42 dias. Você não precisa seguir os horários de forma rígida nem consumir todas as refeições sugeridas.
Use o cardápio de acordo com sua fome, rotina e disponibilidade.

Em cada refeição principal, procure combinar:
- uma fonte de proteína;
- uma fonte de carboidrato;
- legumes ou verduras;
- uma fruta em algum momento do dia;
- água ao longo da rotina.

---

## Porções práticas
| Grupo alimentar | Referência visual |
|---|---|
| Proteína | Uma porção semelhante ao tamanho da palma da mão |
| Carboidrato | Uma porção semelhante ao tamanho de um punho |
| Verduras e legumes | O quanto couber confortavelmente no prato |
| Gorduras | Pequena quantidade para preparar ou temperar |
| Frutas | Uma unidade ou porção compatível com a fruta escolhida |

---

`;

  // As 6 semanas
  WEEKS_DATA.forEach((w) => {
    md += `## Semana ${w.week} — ${w.theme}\n`;
    md += `**Objetivo:** ${w.objective}\n\n`;
    md += `| Dia | Café da manhã | Lanche da manhã | Almoço | Lanche da tarde | Jantar |\n`;
    md += `|---|---|---|---|---|---|\n`;

    const weekDays = DAYS_DATA.filter((d) => d.week === w.week);
    weekDays.forEach((d) => {
      md += `| ${d.day} | ${d.cafe} | ${d.lancheManha} | ${d.almoco} | ${d.lancheTarde} | ${d.jantar} |\n`;
    });

    if (w.highlightItems) {
      md += `\n### ${w.highlightTitle}\n`;
      w.highlightItems.forEach((item) => {
        md += `- ${item}\n`;
      });
    }
    md += `\n---\n\n`;
  });

  // Horários e Hidratação
  md += `## Horários flexíveis\n\n`;
  md += `| Momento | Exemplo de horário | Observação |\n|---|---:|---|\n`;
  FLEXIBLE_SCHEDULE.forEach((s) => {
    md += `| ${s.meal} | ${s.window} | ${s.note} |\n`;
  });

  md += `\n---\n\n## Hidratação\n`;
  md += `Checklist diário de hidratação:\n`;
  md += `- [ ] Bebi água pela manhã\n- [ ] Levei água para o trabalho ou estudo\n- [ ] Bebi água durante o almoço\n- [ ] Bebi água durante a tarde\n- [ ] Bebi água após atividade física\n- [ ] Observei minha sede sem exagerar\n\n---\n\n`;

  // Lista de compras
  md += `## Lista de compras da Semana 1\n\n`;
  SHOPPING_LIST_WEEK1.forEach((cat) => {
    md += `### ${cat.name}\n`;
    cat.items.forEach((item) => {
      md += `- ${item};\n`;
    });
    md += `\n`;
  });

  md += `---\n\n## Preparo em até 2 horas\n\n`;
  md += `### Primeiro bloco: organização\n1. Separe os ingredientes.\n2. Lave as mãos e higienize a bancada.\n3. Coloque arroz, feijão ou lentilha para cozinhar.\n4. Corte legumes.\n5. Tempere as proteínas.\n6. Organize potes e etiquetas.\n\n`;
  md += `### Segundo bloco: cocção\n1. Asse ou grelhe frango, carne ou peixe.\n2. Cozinhe batata, mandioca ou legumes.\n3. Prepare arroz ou outro carboidrato.\n4. Separe folhas e vegetais.\n5. Cozinhe ovos.\n6. Prepare uma sopa ou molho simples.\n\n`;
  md += `### Terceiro bloco: montagem\nMonte porções sem compactar demais: base de carboidrato, leguminosa ou proteína, legumes, folhas e temperos separados.\n\n---\n\n`;

  md += `## Preparo rápido de refeições (Receitas)\n\n`;
  RECIPES_DATA.forEach((r) => {
    md += `### ${r.title}\n**Ingredientes:**\n`;
    r.ingredients.forEach((i) => {
      md += `- ${i};\n`;
    });
    md += `**Modo de preparo:**\n${r.instructions}\n\n`;
  });

  md += `---\n\n## Checklist imprimível por semana\n\n`;
  WEEKLY_HABITS.forEach((wh) => {
    md += `### ${wh.title}\n`;
    wh.items.forEach((item) => {
      md += `- [ ] ${item}\n`;
    });
    md += `\n`;
  });

  md += `---\n\n## Texto final do bônus\n`;
  md += `Você não precisa repetir este cardápio exatamente depois dos 42 dias.\nUse a estrutura como uma base: escolha uma proteína, um carboidrato, vegetais e uma fruta. Faça substituições conforme sua rotina, seu orçamento e seus gostos.\nO melhor cardápio é aquele que você consegue repetir de maneira flexível, prazerosa e segura.\n`;

  return md;
}

export function generateStandalonePrintHtml(): string {
  const weeksHtml = WEEKS_DATA.map((w) => {
    const days = DAYS_DATA.filter((d) => d.week === w.week);
    const rows = days
      .map(
        (d) => `
      <tr>
        <td style="text-align: center; font-weight: bold; padding: 8px; border: 1px solid #e5e7eb;">${d.day}</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb;">${d.cafe}</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; color: #4b5563;">${d.lancheManha}</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: 600;">${d.almoco}</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; color: #4b5563;">${d.lancheTarde}</td>
        <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: 600;">${d.jantar}</td>
      </tr>`
      )
      .join('');

    const highlights = w.highlightItems
      ? `<div style="margin-top: 10px; padding: 10px; background: #f9fafb; border-radius: 8px; font-size: 13px;">
          <strong>${w.highlightTitle}:</strong> ${w.highlightItems.join(' · ')}
        </div>`
      : '';

    return `
      <div style="margin-bottom: 28px; page-break-inside: avoid;">
        <div style="background: #065f46; color: white; padding: 10px 14px; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 16px;">Semana ${w.week} — ${w.theme}</h3>
          <span style="font-size: 12px; opacity: 0.9;">Objetivo: ${w.objective}</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; background: white;">
          <thead>
            <tr style="background: #f3f4f6; text-align: left;">
              <th style="padding: 8px; border: 1px solid #e5e7eb; width: 45px; text-align: center;">Dia</th>
              <th style="padding: 8px; border: 1px solid #e5e7eb;">Café da manhã</th>
              <th style="padding: 8px; border: 1px solid #e5e7eb;">Lanche M</th>
              <th style="padding: 8px; border: 1px solid #e5e7eb;">Almoço</th>
              <th style="padding: 8px; border: 1px solid #e5e7eb;">Lanche T</th>
              <th style="padding: 8px; border: 1px solid #e5e7eb;">Jantar</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        ${highlights}
      </div>
    `;
  }).join('');

  const shoppingHtml = SHOPPING_LIST_WEEK1.map(
    (cat) => `
    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px;">
      <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px;">${cat.name}</h4>
      <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #374151;">
        ${cat.items.map((i) => `<li style="margin-bottom: 3px;">${i}</li>`).join('')}
      </ul>
    </div>
  `
  ).join('');

  const recipesHtml = RECIPES_DATA.map(
    (r) => `
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin-bottom: 14px; page-break-inside: avoid;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h4 style="margin: 0; font-size: 15px; color: #111827;">${r.title}</h4>
        <span style="font-size: 11px; background: #ecfdf5; color: #047857; padding: 2px 8px; border-radius: 12px;">${r.time}</span>
      </div>
      <p style="font-size: 12px; color: #4b5563; margin: 4px 0;"><strong>Ingredientes:</strong> ${r.ingredients.join(', ')}</p>
      <p style="font-size: 12px; color: #1f2937; margin: 6px 0 0 0;"><strong>Modo de Preparo:</strong> ${r.instructions}</p>
    </div>
  `
  ).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Cardápio Dinâmico Rotativo — 42 Dias de Refeições Práticas</title>
  <style>
    @page {
      margin: 1.5cm;
      size: A4;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      line-height: 1.5;
      margin: 0;
      padding: 24px;
      background: #ffffff;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .print-actions {
      background: #111827;
      color: white;
      padding: 12px 20px;
      border-radius: 10px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-print {
      background: #059669;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 14px;
    }
    .disclaimer-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 28px;
      font-size: 12px;
      color: #78350f;
    }
    @media print {
      .print-actions {
        display: none !important;
      }
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="print-actions">
      <div>
        <strong style="font-size: 15px;">Documento Pronto para Impressão e PDF</strong>
        <p style="margin: 2px 0 0 0; font-size: 12px; opacity: 0.8;">Clique no botão ao lado ou pressione Ctrl+P / Cmd+P para salvar em PDF.</p>
      </div>
      <button class="btn-print" onclick="window.print()">Imprimir / Salvar PDF</button>
    </div>

    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
      <span style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #047857; letter-spacing: 1px;">BÔNUS 1 — GUIA COMPLETO</span>
      <h1 style="margin: 8px 0; font-size: 28px; color: #111827;">Cardápio Dinâmico Rotativo</h1>
      <p style="font-size: 15px; color: #4b5563; margin: 4px 0 8px 0;">42 dias de refeições práticas e variadas. Coma melhor sem depender de receitas complicadas.</p>
      <p style="font-size: 13px; font-style: italic; color: #6b7280;">"Planejamento simples. Comida de verdade. Mais tranquilidade para comer bem."</p>
    </div>

    <div class="disclaimer-box">
      <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #92400e;">⚠️ ${HEALTH_DISCLAIMER_TEXT.title}</h4>
      ${HEALTH_DISCLAIMER_TEXT.paragraphs.map((p) => `<p style="margin: 4px 0;">${p}</p>`).join('')}
    </div>

    <div style="margin-bottom: 28px;">
      <h2 style="font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; color: #111827;">Como usar este cardápio</h2>
      <p style="font-size: 13px; color: #374151;">Este material apresenta sugestões para 42 dias. Você não precisa seguir os horários de forma rígida nem consumir todas as refeições sugeridas. Use o cardápio de acordo com sua fome, rotina e disponibilidade.</p>
      <div style="background: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; margin: 10px 0;">
        <strong>Em cada refeição principal, procure combinar:</strong>
        <ul style="margin: 6px 0 0 0; padding-left: 20px;">
          <li>uma fonte de proteína;</li>
          <li>uma fonte de carboidrato;</li>
          <li>legumes ou verduras;</li>
          <li>uma fruta em algum momento do dia;</li>
          <li>água ao longo da rotina.</li>
        </ul>
      </div>
      <p style="font-size: 12px; color: #6b7280;">O lanche da manhã e o lanche da tarde são opcionais. As quantidades devem ser ajustadas conforme sua fome e orientação profissional.</p>
    </div>

    <div style="margin-bottom: 28px;">
      <h2 style="font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; color: #111827;">Porções Práticas Sem Balança</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px;">
        <thead>
          <tr style="background: #f3f4f6; text-align: left;">
            <th style="padding: 8px; border: 1px solid #e5e7eb;">Grupo alimentar</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb;">Referência visual</th>
            <th style="padding: 8px; border: 1px solid #e5e7eb;">Observação</th>
          </tr>
        </thead>
        <tbody>
          ${PORTIONS_GUIDE.map(
            (p) => `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold;">${p.group}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; color: #047857; font-weight: 600;">${p.visual}</td>
              <td style="padding: 8px; border: 1px solid #e5e7eb; color: #4b5563;">${p.tip}</td>
            </tr>`
          ).join('')}
        </tbody>
      </table>
    </div>

    <div style="margin-bottom: 28px;">
      <h2 style="font-size: 20px; border-bottom: 2px solid #065f46; padding-bottom: 6px; color: #111827; margin-bottom: 16px;">
        Cardápio Completo de 42 Dias
      </h2>
      ${weeksHtml}
    </div>

    <div style="margin-bottom: 28px; page-break-inside: avoid;">
      <h2 style="font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; color: #111827;">Lista de Compras da Semana 1</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px;">
        ${shoppingHtml}
      </div>
    </div>

    <div style="margin-bottom: 28px;">
      <h2 style="font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; color: #111827;">Preparo Rápido de Refeições</h2>
      <div style="margin-top: 12px;">
        ${recipesHtml}
      </div>
    </div>

    <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; font-size: 13px; color: #4b5563;">
      <p style="font-weight: bold; color: #111827; margin-bottom: 4px;">O melhor cardápio é aquele que você consegue repetir de maneira flexível, prazerosa e segura.</p>
      <p style="margin: 0;">Você não precisa repetir este cardápio exatamente depois dos 42 dias. Use a estrutura como base e adapte ao seu estilo de vida.</p>
    </div>
  </div>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile() {
  const content = generateStandalonePrintHtml();
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Cardapio_Dinamico_Rotativo_42_Dias.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadMarkdownFile() {
  const content = getFullMarkdownText();
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Cardapio_Dinamico_Rotativo_42_Dias.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
