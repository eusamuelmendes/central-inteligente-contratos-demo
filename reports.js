/* Relatórios demonstrativos. Nenhum valor representa dados reais da empresa. */
(() => {
  const root = document.getElementById('reports');
  if (!root) return;

  const contacts = ['Plínio Ferreira', 'Deisi Santos', 'Edson Ruiz', 'Helis Almeida'];
  const shares = [0.43, 0.29, 0.18, 0.10];
  const profiles = [
    { client: 'Mercado Aurora', branch: 'Varejo', type: 'PI / mídia' },
    { client: 'Indústrias Vale Verde', branch: 'Indústria', type: 'Patrocínio' },
    { client: 'Instituto Nova Era', branch: 'Educação', type: 'Institucional' },
    { client: 'Delta Alimentos', branch: 'Alimentos', type: 'Permuta' }
  ];
  const monthlyTotals = [
    ['2026-01', 250000, 180000, 160000],
    ['2026-02', 270000, 190000, 170000],
    ['2026-03', 287000, 200000, 180000],
    ['2026-04', 320000, 210000, 190000],
    ['2026-05', 380000, 290000, 260000],
    ['2026-06', 410000, 310000, 280000],
    ['2026-07', 460000, 330000, 300000],
    ['2026-08', 395000, 284000, 250000]
  ];
  const split = (total) => {
    const values = shares.slice(0, 3).map(share => Math.round(total * share));
    values.push(total - values.reduce((sum, value) => sum + value, 0));
    return values;
  };
  const records = monthlyTotals.flatMap(([month, gross, billed, received]) => {
    const grossParts = split(gross), billedParts = split(billed), receivedParts = split(received);
    const discountParts = split(Math.round(gross * 0.11));
    const commissionParts = split(Math.round(gross * 0.08));
    return profiles.map((profile, index) => ({
      id: `CT-${month.replace('-', '')}-${String(index + 1).padStart(2, '0')}`,
      date: `${month}-15`, contact: contacts[index], ...profile,
      gross: grossParts[index], billed: billedParts[index], received: receivedParts[index],
      discount: discountParts[index], commission: commissionParts[index]
    }));
  });
  records.push(
    { id: 'CT-2026-0142', date: '2026-09-10', contact: contacts[0], ...profiles[0], gross: 184500, billed: 150000, received: 132000, discount: 20000, commission: 16000 },
    { id: 'CT-2026-0137', date: '2026-09-12', contact: contacts[1], ...profiles[1], gross: 121700, billed: 90000, received: 80000, discount: 14000, commission: 10000 },
    { id: 'CT-2026-0151', date: '2026-09-17', contact: contacts[2], ...profiles[2], gross: 78300, billed: 50000, received: 40000, discount: 9000, commission: 7000 },
    { id: 'CT-2026-0154', date: '2026-09-20', contact: contacts[3], ...profiles[3], gross: 43500, billed: 28000, received: 22000, discount: 5000, commission: 3000 }
  );

  root.classList.add('reports-v2');
  root.innerHTML = `
    <div class="page-heading reports-heading"><div><p class="eyebrow">RELATÓRIOS · DADOS ILUSTRATIVOS</p><h1>Relatórios de contratos</h1><p class="muted">Valores simulados e calculados a partir dos contratos desta demonstração.</p></div><span class="reports-demo-badge">Demonstração</span></div>
    <div class="reports-tabs" role="tablist" aria-label="Painéis de relatórios"><button id="reports-tab-finance" type="button" role="tab" aria-controls="reports-finance" aria-selected="true" class="active">Visão financeira</button><button id="reports-tab-goals" type="button" role="tab" aria-controls="reports-goals" aria-selected="false">Metas e comparativos</button></div>
    <div class="panel reports-filter-panel"><label>Mês de referência<input id="reports-month" type="month" min="2026-01" max="2026-09" value="2026-09"></label><label>Contato comercial<select id="reports-contact"><option value="">Todos os contatos</option>${contacts.map(name => `<option>${name}</option>`).join('')}</select></label><label id="reports-type-label">Tipo de contrato<select id="reports-type"><option value="">Todos os tipos</option>${profiles.map(item => `<option>${item.type}</option>`).join('')}</select></label><button id="reports-clear" type="button" class="secondary">Limpar filtros</button></div>
    <p class="reports-scope-note" id="reports-scope-note" aria-live="polite"></p>
    <div id="reports-finance" role="tabpanel" aria-labelledby="reports-tab-finance">
      <div class="financial-kpis" id="financial-kpis"></div>
      <div class="financial-grid"><section class="panel report-v2-panel"><div class="report-v2-head"><div><h2>Contratado × faturado</h2><p>Últimos seis meses até o mês selecionado</p></div><div class="chart-key"><span><i class="key-gross"></i>Contratado</span><span><i class="key-billed"></i>Faturado</span></div></div><div id="financial-chart"></div></section><section class="panel report-v2-panel"><div class="report-v2-head"><div><h2>Composição do valor</h2><p>Do valor bruto ao valor líquido</p></div></div><div id="financial-composition"></div></section></div>
      <section class="panel report-v2-panel source-panel"><div class="report-v2-head"><div><h2>Contratos que compõem o período</h2><p>Abra uma linha para conferir os valores de origem.</p></div><div class="report-v2-actions"><button id="reports-csv" type="button" class="secondary">Exportar CSV</button><button id="reports-print" type="button" class="secondary">Imprimir</button></div></div><div class="report-v2-table-wrap"><table><thead><tr><th>Contrato</th><th>Cliente</th><th>Contato</th><th>Tipo</th><th>Contratado</th><th>Faturado</th><th>A faturar</th><th>Detalhes</th></tr></thead><tbody id="financial-rows"></tbody></table></div></section>
    </div>
    <div id="reports-goals" role="tabpanel" aria-labelledby="reports-tab-goals" hidden>
      <div class="goals-top"><div><h2>Acompanhamento de metas</h2><p>Meta mensal, semestre calendário e ano; realizado acumulado até o mês selecionado.</p></div><button id="goals-edit" type="button" class="secondary">Editar metas</button></div>
      <div class="goal-cards" id="goal-cards"></div>
      <div class="goals-grid"><section class="panel report-v2-panel"><div class="report-v2-head"><div><h2>Contatos comerciais</h2><p>Valor contratado no mês selecionado</p></div></div><div id="goals-contacts"></div></section><section class="panel report-v2-panel"><div class="report-v2-head"><div><h2>Clientes</h2><p>Comparação pelo valor contratado no mês</p></div></div><div id="goals-clients"></div></section></div>
      <section class="panel report-v2-panel previous-panel"><div class="report-v2-head"><div><h2>Comparação com o mês anterior</h2><p>Mesmo contato selecionado; todos os tipos de contrato.</p></div><button id="goals-source" type="button" class="secondary">Ver contratos de origem →</button></div><div id="goals-previous"></div></section>
    </div>
    <dialog id="goals-dialog" class="data-dialog"><form id="goals-form"><div class="dialog-head"><div><p class="eyebrow">DADOS ILUSTRATIVOS · NESTE DISPOSITIVO</p><h2>Editar metas</h2></div><button id="goals-close" type="button" class="dialog-close" aria-label="Fechar">×</button></div><p class="form-hint" id="goals-dialog-scope"></p><div class="dialog-grid"><label>Meta mensal (R$)<input name="month" type="number" min="1" step="1" required></label><label>Meta semestral (R$)<input name="semester" type="number" min="1" step="1" required></label><label>Meta anual (R$)<input name="year" type="number" min="1" step="1" required></label></div><p class="form-hint">Alterações ficam salvas somente neste navegador. Contratos e valores continuam ilustrativos.</p><div class="dialog-actions"><button id="goals-cancel" type="button" class="secondary">Cancelar</button><button type="submit" class="primary">Salvar metas</button></div></form></dialog>
  `;

  const byId = id => document.getElementById(id);
  const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
  const compact = value => value >= 1000000 ? `R$ ${(value / 1000000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi` : `R$ ${(value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`;
  const percent = value => `${value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
  const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);
  const monthName = value => new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T12:00:00Z`)).replace('.', '');
  const monthDate = value => new Date(`${value}-01T12:00:00Z`);
  const previousMonth = value => { const date = monthDate(value); date.setUTCMonth(date.getUTCMonth() - 1); return date.toISOString().slice(0, 7); };
  const monthsBack = (value, count) => { const result = []; let current = value; for (let i = 0; i < count; i++) { result.unshift(current); current = previousMonth(current); } return result; };
  let activeTab = 'finance';
  let savedGoals = {};
  try { savedGoals = JSON.parse(localStorage.getItem('opec-demo-goals-v1') || '{}') || {}; } catch { savedGoals = {}; }
  const month = () => byId('reports-month').value || '2026-09';
  const owner = () => byId('reports-contact').value;
  const type = () => byId('reports-type').value;
  const scoped = (items, includeType = true) => items.filter(item => (!owner() || item.contact === owner()) && (!includeType || !type() || item.type === type()));
  const monthly = (value, includeType = true) => scoped(records.filter(item => item.date.slice(0, 7) === value), includeType);
  const periodKeys = () => {
    const value = month(), year = value.slice(0, 4), half = Number(value.slice(5, 7)) <= 6 ? 'S1' : 'S2';
    return { month: value, semester: `${year}-${half}`, year };
  };
  const fallbackGoal = kind => {
    const base = { month: 500000, semester: 2400000, year: 4800000 }[kind];
    return owner() ? Math.round(base * shares[contacts.indexOf(owner())]) : base;
  };
  const goalKey = kind => `${owner() || 'todos'}|${kind}|${periodKeys()[kind]}`;
  const goal = kind => Number(savedGoals[goalKey(kind)]) || fallbackGoal(kind);
  const diff = (current, prior) => prior ? `${current >= prior ? '+' : ''}${percent((current / prior - 1) * 100)}` : '—';
  const trendClass = (current, prior) => current >= prior ? 'positive' : 'negative';
  const totals = items => ({ gross: sum(items, 'gross'), billed: sum(items, 'billed'), received: sum(items, 'received'), discount: sum(items, 'discount'), commission: sum(items, 'commission') });

  function renderFinance() {
    const current = monthly(month());
    const values = totals(current), prior = totals(monthly(previousMonth(month())));
    const items = [
      ['Contratado', values.gross, prior.gross, 'teal'],
      ['Faturado', values.billed, prior.billed, 'blue'],
      ['Recebido', values.received, prior.received, 'violet'],
      ['A faturar', values.gross - values.billed, prior.gross - prior.billed, 'orange']
    ];
    byId('financial-kpis').innerHTML = items.map(([label, value, before, color]) => `<div class="financial-kpi ${color}"><span>${label}</span><strong>${compact(value)}</strong><small class="${trendClass(value, before)}">${diff(value, before)} <em>vs. ${monthName(previousMonth(month()))}</em></small></div>`).join('');

    const periods = monthsBack(month(), 6).filter(value => value >= '2026-01');
    const chartValues = periods.map(value => ({ month: value, ...totals(monthly(value)) }));
    const max = Math.max(1, ...chartValues.map(value => value.gross));
    byId('financial-chart').innerHTML = `<div class="finance-chart" aria-label="Gráfico de contratado e faturado por mês">${chartValues.map(value => `<div class="finance-chart-group"><div class="finance-chart-bars"><div class="finance-chart-bar gross" style="height:${Math.max(2, value.gross / max * 100)}%" title="Contratado ${money(value.gross)}"><span>${compact(value.gross)}</span></div><div class="finance-chart-bar billed" style="height:${Math.max(2, value.billed / max * 100)}%" title="Faturado ${money(value.billed)}"><span>${compact(value.billed)}</span></div></div><small>${monthName(value.month)}</small></div>`).join('')}</div>`;
    const net = values.gross - values.discount - values.commission;
    byId('financial-composition').innerHTML = `<div class="composition-total"><span>Valor bruto contratado</span><strong>${money(values.gross)}</strong></div><div class="composition-track" role="img" aria-label="Líquido ${money(net)}, descontos ${money(values.discount)}, comissões ${money(values.commission)}"><span class="net" style="width:${values.gross ? net / values.gross * 100 : 0}%"></span><span class="discount" style="width:${values.gross ? values.discount / values.gross * 100 : 0}%"></span><span class="commission" style="width:${values.gross ? values.commission / values.gross * 100 : 0}%"></span></div><div class="composition-legend"><div><i class="net"></i><span>Líquido</span><strong>${money(net)}</strong></div><div><i class="discount"></i><span>Descontos</span><strong>− ${money(values.discount)}</strong></div><div><i class="commission"></i><span>Comissões</span><strong>− ${money(values.commission)}</strong></div></div><p class="composition-footnote">Líquido = contratado − descontos − comissões. Faturado e recebido são etapas financeiras separadas.</p>`;
    byId('financial-rows').innerHTML = current.length ? current.map(item => `<tr><td><strong>${item.id}</strong></td><td>${item.client}</td><td>${item.contact}</td><td>${item.type}</td><td>${money(item.gross)}</td><td>${money(item.billed)}</td><td>${money(item.gross - item.billed)}</td><td><details class="contract-details"><summary aria-label="Detalhes de ${item.id}">Ver</summary><div>Recebido: <b>${money(item.received)}</b><br>Desconto: <b>${money(item.discount)}</b><br>Comissão: <b>${money(item.commission)}</b><br>Líquido: <b>${money(item.gross - item.discount - item.commission)}</b></div></details></td></tr>`).join('') : '<tr><td colspan="8" class="reports-empty">Nenhum contrato ilustrativo corresponde aos filtros.</td></tr>';
  }

  function ranking(containerId, rows, color) {
    const max = Math.max(1, ...rows.map(row => row.value));
    byId(containerId).innerHTML = rows.length ? `<div class="ranking-list">${rows.map((row, index) => `<div class="ranking-row"><span class="ranking-number">${index + 1}</span><span class="ranking-name">${row.name}</span><div class="ranking-track"><i class="${color}" style="width:${row.value / max * 100}%"></i></div><strong>${compact(row.value)}</strong></div>`).join('')}</div>` : '<p class="reports-empty">Nenhum contrato neste recorte.</p>';
  }
  function renderGoals() {
    const keys = periodKeys(), value = month();
    const semesterStart = keys.semester.endsWith('S1') ? `${keys.year}-01` : `${keys.year}-07`;
    const scopes = [
      ['month', 'Meta mensal', monthly(value, false)],
      ['semester', 'Meta semestral', scoped(records.filter(item => item.date.slice(0, 7) >= semesterStart && item.date.slice(0, 7) <= value), false)],
      ['year', 'Meta anual', scoped(records.filter(item => item.date.slice(0, 7) >= `${keys.year}-01` && item.date.slice(0, 7) <= value), false)]
    ];
    byId('goal-cards').innerHTML = scopes.map(([kind, label, items]) => {
      const realized = sum(items, 'gross'), target = goal(kind), ratio = target ? realized / target * 100 : 0;
      return `<article class="goal-card ${kind}"><div class="goal-card-title"><span>${label}</span><strong>${percent(ratio)}</strong></div><div class="goal-card-values"><div><small>Realizado</small><b>${compact(realized)}</b></div><div><small>Meta</small><b>${compact(target)}</b></div></div><div class="goal-track"><i style="width:${Math.min(100, ratio)}%"></i></div><p>${realized >= target ? `Meta superada em ${compact(realized - target)}` : `Faltam ${compact(target - realized)} para a meta`}</p></article>`;
    }).join('');
    const monthItems = monthly(value, false);
    ranking('goals-contacts', contacts.filter(name => !owner() || name === owner()).map(name => ({ name, value: sum(monthItems.filter(item => item.contact === name), 'gross') })).sort((a, b) => b.value - a.value), 'contact');
    const clients = [...new Set(monthItems.map(item => item.client))].map(name => ({ name, value: sum(monthItems.filter(item => item.client === name), 'gross') })).sort((a, b) => b.value - a.value);
    ranking('goals-clients', clients, 'client');
    const current = monthItems, previous = monthly(previousMonth(value), false);
    const metrics = [
      ['Contratado', sum(current, 'gross'), sum(previous, 'gross'), compact],
      ['Contratos', current.length, previous.length, number => String(number)],
      ['Ticket médio', current.length ? sum(current, 'gross') / current.length : 0, previous.length ? sum(previous, 'gross') / previous.length : 0, compact]
    ];
    byId('goals-previous').innerHTML = `<div class="previous-metrics">${metrics.map(([label, now, before, format]) => `<div><span>${label}</span><strong>${format(now)}</strong><small class="${trendClass(now, before)}">${diff(now, before)} vs. ${monthName(previousMonth(value))}</small></div>`).join('')}</div>`;
  }
  function render() {
    const label = `${monthName(month())}${owner() ? ` · ${owner()}` : ' · todos os contatos'}`;
    byId('reports-scope-note').textContent = activeTab === 'finance' ? `${label}${type() ? ` · ${type()}` : ' · todos os tipos'} · dados ilustrativos; faturamento e recebimento simulados.` : `${label} · metas locais; comparativos baseados em contratos ilustrativos.`;
    byId('reports-type-label').hidden = activeTab !== 'finance';
    renderFinance();
    renderGoals();
  }
  function setTab(tab) {
    activeTab = tab;
    for (const key of ['finance', 'goals']) {
      byId(`reports-${key}`).hidden = key !== tab;
      byId(`reports-tab-${key}`).classList.toggle('active', key === tab);
      byId(`reports-tab-${key}`).setAttribute('aria-selected', String(key === tab));
    }
    render();
  }
  byId('reports-tab-finance').addEventListener('click', () => setTab('finance'));
  byId('reports-tab-goals').addEventListener('click', () => setTab('goals'));
  byId('reports-month').addEventListener('change', render);
  byId('reports-contact').addEventListener('change', render);
  byId('reports-type').addEventListener('change', render);
  byId('reports-clear').addEventListener('click', () => { byId('reports-month').value = '2026-09'; byId('reports-contact').value = ''; byId('reports-type').value = ''; render(); });
  byId('goals-source').addEventListener('click', () => { setTab('finance'); byId('reports-type').value = ''; render(); byId('financial-rows').closest('.source-panel').scrollIntoView({ behavior: 'smooth' }); });
  byId('goals-edit').addEventListener('click', () => {
    const form = byId('goals-form');
    for (const kind of ['month', 'semester', 'year']) form.elements[kind].value = goal(kind);
    byId('goals-dialog-scope').textContent = `${owner() || 'Todos os contatos'} · ${periodKeys().month}, ${periodKeys().semester}, ${periodKeys().year}`;
    byId('goals-dialog').showModal();
  });
  byId('goals-close').addEventListener('click', () => byId('goals-dialog').close());
  byId('goals-cancel').addEventListener('click', () => byId('goals-dialog').close());
  byId('goals-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const kind of ['month', 'semester', 'year']) savedGoals[goalKey(kind)] = Number(form.elements[kind].value);
    try { localStorage.setItem('opec-demo-goals-v1', JSON.stringify(savedGoals)); } catch { /* private mode: keep this session */ }
    byId('goals-dialog').close();
    render();
  });
  byId('reports-csv').addEventListener('click', () => {
    const rows = monthly(month());
    const headers = ['Contrato', 'Data', 'Cliente', 'Ramo', 'Contato', 'Tipo', 'Contratado', 'Faturado', 'Recebido', 'A faturar', 'Desconto', 'Comissão', 'Líquido'];
    const escape = value => `"${String(value).replaceAll('"', '""')}"`;
    const csv = [headers, ...rows.map(item => [item.id, item.date, item.client, item.branch, item.contact, item.type, item.gross, item.billed, item.received, item.gross - item.billed, item.discount, item.commission, item.gross - item.discount - item.commission])].map(row => row.map(escape).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `relatorio-contratos-ilustrativo-${month()}.csv`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  byId('reports-print').addEventListener('click', () => window.print());
  render();
})();
