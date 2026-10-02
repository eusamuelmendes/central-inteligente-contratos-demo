(() => {
  const setup = () => {
    const filters = document.querySelector('#automation-opec .automation-filters');
    const list = document.getElementById('automation-request-list');
    if (!filters || !list || filters.querySelector('[data-auto-filter="owner"]')) return;
    filters.insertAdjacentHTML('beforeend','<select data-auto-filter="owner" aria-label="Filtrar por responsável"><option>Todos os responsáveis</option><option>Plínio Ferreira</option><option>Deisi Santos</option><option>Edson Ruiz</option><option>Helis Almeida</option></select><select data-auto-filter="client" aria-label="Filtrar por cliente"><option>Todos os clientes</option><option>Mercado Aurora</option><option>Instituto Nova Era</option><option>Grupo Vale Verde</option></select>');
    const apply = () => { const owner=filters.querySelector('[data-auto-filter="owner"]').value; const client=filters.querySelector('[data-auto-filter="client"]').value; list.querySelectorAll('.automation-request').forEach(row=>{const text=row.textContent;row.hidden=(owner!=='Todos os responsáveis'&&!text.includes(owner))||(client!=='Todos os clientes'&&!text.includes(client));}); };
    filters.addEventListener('change', event=>{if(event.target.dataset.autoFilter) apply();});
    new MutationObserver(apply).observe(list,{childList:true});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setTimeout(setup,0);
})();
