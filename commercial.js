(() => {
  'use strict';

  const KEY = 'central-contratos-commercial-demo-v1';
  const ACTIVE_STAGES = ['Prospecção', 'Proposta enviada', 'Negociação', 'Aguardando assinatura'];
  const CLOSED_STAGES = ['Fechado ganho', 'Perdido'];
  const CONTACTS = ['Plínio Ferreira', 'Deisi Santos', 'Edson Ruiz', 'Helis Almeida'];
  const TYPES = ['Em espera', 'NF rejeitada', 'Pagamento em atraso', 'Contrato cancelado'];
  const STATES = ['Aberta', 'Em andamento', 'Resolvida'];
  const $ = (selector) => document.querySelector(selector);
  const dateLabel = (iso) => /^\d{4}-\d{2}-\d{2}$/.test(iso || '') ? iso.split('-').reverse().join('/') : '—';
  const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(Number(value) || 0);
  const safe = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const id = () => (globalThis.crypto?.randomUUID ? crypto.randomUUID() : `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const seed = {
    opportunities: [
      { id: 'op-1', client: 'Mercado Aurora', branch: 'Varejo', owner: 'Plínio Ferreira', stage: 'Prospecção', potential: 320000, nextDate: '2026-10-22', nextAction: 'Agendar apresentação comercial', notes: '' },
      { id: 'op-2', client: 'Instituto Nova Era', branch: 'Educação', owner: 'Deisi Santos', stage: 'Prospecção', potential: 150000, nextDate: '2026-10-28', nextAction: 'Fazer primeiro contato', notes: '' },
      { id: 'op-3', client: 'Grupo Vale Verde', branch: 'Indústria', owner: 'Edson Ruiz', stage: 'Proposta enviada', potential: 480000, nextDate: '2026-10-20', nextAction: 'Confirmar recebimento da proposta', notes: '' },
      { id: 'op-4', client: 'Loja Horizonte', branch: 'Varejo', owner: 'Helis Almeida', stage: 'Proposta enviada', potential: 210000, nextDate: '2026-10-27', nextAction: 'Apresentar plano de inserções', notes: '' },
      { id: 'op-5', client: 'Clínica Bem Viver', branch: 'Serviços', owner: 'Plínio Ferreira', stage: 'Negociação', potential: 650000, nextDate: '2026-10-24', nextAction: 'Revisar condições comerciais', notes: '' },
      { id: 'op-6', client: 'Rede Conecta', branch: 'Tecnologia', owner: 'Deisi Santos', stage: 'Negociação', potential: 390000, nextDate: '2026-10-29', nextAction: 'Alinhar cronograma com o cliente', notes: '' },
      { id: 'op-7', client: 'Educa Mais', branch: 'Educação', owner: 'Edson Ruiz', stage: 'Aguardando assinatura', potential: 275000, nextDate: '2026-10-21', nextAction: 'Confirmar assinatura do contrato', notes: '' },
      { id: 'op-8', client: 'Delta Alimentos', branch: 'Indústria', owner: 'Helis Almeida', stage: 'Aguardando assinatura', potential: 520000, nextDate: '2026-10-23', nextAction: 'Acompanhar assinatura pendente', notes: '' }
    ],
    issues: [
      { id: 'bi-1', client: 'Comercial São Lucas', contractId: 'CT-2026-078', type: 'Em espera', reason: 'Dados fiscais pendentes', owner: 'Edson Ruiz', nextAction: 'Solicitar documentação fiscal', dueDate: '2026-10-20', state: 'Aberta' },
      { id: 'bi-2', client: 'Alpha Serviços', contractId: 'CT-2026-104', type: 'NF rejeitada', reason: 'Cadastro divergente', owner: 'Deisi Santos', nextAction: 'Corrigir cadastro e reenviar NF', dueDate: '2026-10-22', state: 'Em andamento' },
      { id: 'bi-3', client: 'Construtora Horizonte', contractId: 'CT-2025-311', type: 'Pagamento em atraso', reason: 'Vencimento passado', owner: 'Plínio Ferreira', nextAction: 'Contatar cliente para regularização', dueDate: '2026-10-21', state: 'Aberta' },
      { id: 'bi-4', client: 'Viva Bem Saúde', contractId: 'CT-2026-119', type: 'Contrato cancelado', reason: 'Cancelamento solicitado e aprovado', owner: 'Helis Almeida', nextAction: 'Conferir encerramento e registrar no histórico', dueDate: '2026-10-23', state: 'Em andamento' }
    ]
  };

  function readData() {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY));
      if (stored && Array.isArray(stored.opportunities) && Array.isArray(stored.issues)) return stored;
    } catch (_) { /* Browser storage can be unavailable in private mode. */ }
    return { opportunities: seed.opportunities.map((item) => ({ ...item })), issues: seed.issues.map((item) => ({ ...item })) };
  }
  let data = readData();
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch (_) { $('#commercial .demo-note').textContent = 'Armazenamento local indisponível. Alterações desta sessão podem se perder ao fechar a página.'; }
  }
  function notify(message) { if (typeof toast === 'function') toast(message); }
  function matchingOp(item) {
    const owner = $('#commercial-owner-filter').value;
    const term = $('#commercial-search').value.trim().toLocaleLowerCase('pt-BR');
    return (!owner || item.owner === owner) && (!term || item.client.toLocaleLowerCase('pt-BR').includes(term));
  }
  function renderOpportunity(item) {
    const index = ACTIVE_STAGES.indexOf(item.stage);
    return `<article class="opportunity-card" aria-label="${safe(item.client)}: ${safe(item.stage)}">
      <div class="opportunity-card-top"><strong>${safe(item.client)}</strong><button type="button" class="card-edit" data-op-edit="${safe(item.id)}" aria-label="Editar oportunidade de ${safe(item.client)}">Editar</button></div>
      <small>${safe(item.branch)} · ${safe(item.owner)}</small>
      <div class="opportunity-value"><span>Valor potencial</span><b>${money(item.potential)}</b></div>
      <div class="opportunity-next"><span>Próxima ação · ${dateLabel(item.nextDate)}</span><p>${safe(item.nextAction)}</p></div>
      <button type="button" class="advance-button" data-op-advance="${safe(item.id)}">${index === 3 ? 'Marcar como ganho' : 'Avançar etapa →'}</button>
    </article>`;
  }
  function renderCommercial() {
    const owner = $('#commercial-owner-filter').value;
    const search = $('#commercial-search').value.trim().toLocaleLowerCase('pt-BR');
    const visible = data.opportunities.filter(matchingOp);
    const active = visible.filter((item) => ACTIVE_STAGES.includes(item.stage));
    const stageFilter = $('#commercial-stage-filter').value;
    $('#commercial-kpis').innerHTML = ACTIVE_STAGES.map((stage, index) => `<div class="commercial-kpi kpi-${index}"><small>${safe(stage)}</small><strong>${active.filter((item) => item.stage === stage).length}</strong></div>`).join('');
    $('#potential-total').textContent = `Valor potencial ativo: ${money(active.reduce((sum, item) => sum + Number(item.potential || 0), 0))}`;
    $('#pipeline-board').hidden = stageFilter === 'closed';
    $('#pipeline-board').innerHTML = ACTIVE_STAGES.map((stage, index) => {
      const items = active.filter((item) => item.stage === stage);
      return `<section class="pipeline-column stage-${index}" aria-label="${safe(stage)}"><header><h3>${safe(stage)}</h3><span>${items.length}</span></header><div class="pipeline-items">${items.length ? items.map(renderOpportunity).join('') : '<p class="empty-column">Nenhuma oportunidade nesta etapa.</p>'}</div></section>`;
    }).join('');
    const closed = data.opportunities.filter((item) => CLOSED_STAGES.includes(item.stage) && (!owner || item.owner === owner) && (!search || item.client.toLocaleLowerCase('pt-BR').includes(search)));
    $('#closed-panel').hidden = stageFilter === 'active';
    $('#closed-opportunities').innerHTML = closed.length ? closed.map((item) => `<div class="closed-item"><div><strong>${safe(item.client)}</strong><small>${safe(item.owner)} · ${safe(item.stage)} · ${money(item.potential)} potencial histórico</small></div><div class="closed-actions"><button type="button" class="secondary" data-op-edit="${safe(item.id)}">Editar</button>${item.stage === 'Fechado ganho' ? `<button type="button" class="primary" data-op-capture="${safe(item.id)}">Iniciar captura</button>` : ''}</div></div>`).join('') : '<p class="empty-column">Nenhuma oportunidade concluída neste filtro.</p>';
    renderBilling();
  }
  function renderBilling() {
    const owner = $('#commercial-owner-filter').value;
    const query = $('#billing-search').value.trim().toLocaleLowerCase('pt-BR');
    const stateFilter = $('#billing-state-filter').value;
    const visible = data.issues.filter((item) => (!owner || item.owner === owner) && (!query || `${item.client} ${item.contractId}`.toLocaleLowerCase('pt-BR').includes(query)) && (stateFilter === 'all' || (stateFilter === 'resolved' ? item.state === 'Resolvida' : item.state !== 'Resolvida')));
    const openCount = data.issues.filter((item) => item.state !== 'Resolvida' && (!owner || item.owner === owner)).length;
    $('#billing-summary').textContent = `${openCount} ${openCount === 1 ? 'situação em aberto' : 'situações em aberto'} · Dados ilustrativos`;
    $('#billing-body').innerHTML = visible.length ? visible.map((item) => `<tr><td><strong>${safe(item.client)}</strong><small>${safe(item.contractId)}</small></td><td><span class="issue-tag issue-${TYPES.indexOf(item.type)}">${safe(item.type)}</span><small>${safe(item.state)}</small></td><td>${safe(item.reason)}</td><td>${safe(item.owner)}</td><td>${safe(item.nextAction)}</td><td>${dateLabel(item.dueDate)}</td><td><div class="billing-actions"><button type="button" data-issue-edit="${safe(item.id)}">Editar</button>${item.state !== 'Resolvida' ? `<button type="button" data-issue-resolve="${safe(item.id)}">Resolver</button>` : ''}</div></td></tr>`).join('') : '<tr><td colspan="7" class="billing-empty">Nenhuma pendência encontrada para estes filtros.</td></tr>';
  }
  function openForm(dialogSelector, formSelector, record, title) {
    const dialog = $(dialogSelector);
    const form = $(formSelector);
    form.reset();
    form.elements.id.value = record?.id || '';
    if (record) Object.entries(record).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
    $(`${dialogSelector} .dialog-head h2`).textContent = title;
    dialog.showModal();
    form.elements.client.focus();
  }
  function formRecord(form, keys) {
    const values = Object.fromEntries(new FormData(form));
    const record = Object.fromEntries(keys.map((key) => [key, String(values[key] ?? '').trim()]));
    record.id = values.id || id();
    return record;
  }

  $('#new-opportunity').addEventListener('click', () => openForm('#opportunity-dialog', '#opportunity-form', null, 'Nova oportunidade'));
  $('#new-billing-issue').addEventListener('click', () => openForm('#billing-dialog', '#billing-form', null, 'Nova pendência'));
  document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('.data-dialog').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
  $('#opportunity-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const record = formRecord(event.currentTarget, ['client', 'branch', 'owner', 'stage', 'potential', 'nextDate', 'nextAction', 'notes']);
    record.potential = Number(record.potential);
    if (!record.client || !CONTACTS.includes(record.owner) || ![...ACTIVE_STAGES, ...CLOSED_STAGES].includes(record.stage) || !Number.isFinite(record.potential) || record.potential < 0 || !record.nextDate || !record.nextAction) return;
    const current = data.opportunities.findIndex((item) => item.id === record.id);
    if (current >= 0) data.opportunities[current] = record; else data.opportunities.push(record);
    persist(); $('#opportunity-dialog').close(); renderCommercial(); notify('Oportunidade salva nesta demonstração.');
  });
  $('#billing-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const record = formRecord(event.currentTarget, ['client', 'contractId', 'type', 'owner', 'reason', 'nextAction', 'dueDate', 'state']);
    if (!record.client || !record.contractId || !TYPES.includes(record.type) || !CONTACTS.includes(record.owner) || !STATES.includes(record.state) || !record.reason || !record.nextAction || !record.dueDate) return;
    const current = data.issues.findIndex((item) => item.id === record.id);
    if (current >= 0) data.issues[current] = record; else data.issues.push(record);
    persist(); $('#billing-dialog').close(); renderCommercial(); notify('Pendência salva nesta demonstração.');
  });
  $('#commercial').addEventListener('click', (event) => {
    const target = event.target.closest('button[data-op-edit], button[data-op-advance], button[data-op-capture], button[data-issue-edit], button[data-issue-resolve]');
    if (!target) return;
    if (target.dataset.opEdit) {
      const record = data.opportunities.find((item) => item.id === target.dataset.opEdit);
      if (record) openForm('#opportunity-dialog', '#opportunity-form', record, 'Editar oportunidade');
    } else if (target.dataset.opAdvance) {
      const record = data.opportunities.find((item) => item.id === target.dataset.opAdvance);
      const index = record && ACTIVE_STAGES.indexOf(record.stage);
      if (index >= 0) { record.stage = index === ACTIVE_STAGES.length - 1 ? 'Fechado ganho' : ACTIVE_STAGES[index + 1]; persist(); renderCommercial(); notify('Etapa comercial atualizada.'); }
    } else if (target.dataset.opCapture) {
      const record = data.opportunities.find((item) => item.id === target.dataset.opCapture);
      if (!record) return;
      let banner = $('#opportunity-capture-context');
      if (!banner) { banner = document.createElement('div'); banner.id = 'opportunity-capture-context'; banner.className = 'demo-note capture-context'; $('#new .page-heading').after(banner); }
      banner.textContent = `Oportunidade de ${record.client} selecionada para captura. O vínculo definitivo ao contrato dependerá do cadastro compartilhado.`;
      showView('new');
    } else if (target.dataset.issueEdit) {
      const record = data.issues.find((item) => item.id === target.dataset.issueEdit);
      if (record) openForm('#billing-dialog', '#billing-form', record, 'Editar pendência');
    } else if (target.dataset.issueResolve) {
      const record = data.issues.find((item) => item.id === target.dataset.issueResolve);
      if (record) { record.state = 'Resolvida'; persist(); renderCommercial(); notify('Pendência marcada como resolvida.'); }
    }
  });
  ['commercial-owner-filter', 'commercial-search', 'commercial-stage-filter', 'billing-state-filter', 'billing-search'].forEach((name) => {
    $('#' + name).addEventListener(name.includes('search') ? 'input' : 'change', renderCommercial);
  });
  renderCommercial();
})();
