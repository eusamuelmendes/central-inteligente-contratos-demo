(() => {
  const users = [
    ['Plínio Ferreira', 'Contato comercial', 'Carteira própria, clientes, oportunidades e ações comerciais', 'Azul'],
    ['Deisi Santos', 'Contato comercial', 'Carteira própria, clientes, oportunidades e ações comerciais', 'Azul'],
    ['Edson Ruiz', 'Contato comercial', 'Carteira própria, clientes, oportunidades e ações comerciais', 'Azul'],
    ['Helis Almeida', 'Contato comercial', 'Carteira própria, clientes, oportunidades e ações comerciais', 'Azul'],
    ['João', 'OPEC', 'Visão geral, contratos, documentos e relatórios operacionais', 'Teal'],
    ['Felipe', 'Financeiro', 'Faturamento, recebimentos, saldos e relatórios financeiros', 'Violeta'],
    ['Fernando Nunes', 'Gerente comercial', 'Equipe comercial, carteira, metas e relatórios', 'Âmbar'],
    ['André Vieira', 'Gerência', 'Visão executiva, contratos, relatórios e indicadores', 'Navy']
  ];
  const render = () => {
    const root = document.getElementById('roadmap-users');
    if (!root) return;
    root.innerHTML = `<div class="page-heading access-heading"><div><p class="eyebrow">USUÁRIOS E PERMISSÕES · DADOS ILUSTRATIVOS</p><h1>Acessos do sistema <span class="demo-badge">Demonstração</span></h1><p class="muted">Visualize os perfis demonstrativos e o nível de acesso de cada área.</p></div><button class="primary roadmap-action" data-action="Novo usuário">＋ Novo usuário</button></div><div class="access-warning"><strong>Senha base demonstrativa: <code>sbt123</code></strong><span>Todos os acessos abaixo são fictícios. A autenticação real ainda não está ativa.</span></div><div class="access-summary"><div><strong>${users.length}</strong><span>Usuários demonstrativos</span></div><div><strong>4</strong><span>Contatos comerciais</span></div><div><strong>4</strong><span>Áreas de gestão</span></div><div><strong>Ativo</strong><span>Modo demonstração</span></div></div><section class="access-card"><div class="panel-head"><div><h2>Usuários e permissões</h2><p class="muted">Cada perfil possui uma área de atuação sugerida.</p></div><button class="secondary access-filter">Filtrar por perfil</button></div><div class="access-grid">${users.map((user, index) => `<article class="access-user"><div class="access-user-top"><span class="access-avatar access-${user[3].toLowerCase()}">${user[0].split(' ').map(part => part[0]).slice(0,2).join('')}</span><span class="user-status">Ativo</span></div><h3>${user[0]}</h3><p class="access-role">${user[1]}</p><div class="access-login"><span>Usuário de demonstração</span><strong>${user[0].toLowerCase().replace(/\s+/g,'.')}</strong></div><div class="access-password"><span>Senha base</span><code>sbt123</code></div><div class="access-permissions"><small>PERMISSÕES SUGERIDAS</small><p>${user[2]}</p></div><button class="secondary access-action" data-access-user="${index}">Ver permissões</button></article>`).join('')}</div></section><section class="access-note"><strong>Próxima etapa de segurança</strong><span>Na versão real, cada usuário deverá ter senha individual, recuperação de acesso, autenticação segura, registro de logs e permissões controladas pelo administrador.</span></section>`;
    root.querySelectorAll('.access-action').forEach(button => button.addEventListener('click', () => { const user = users[Number(button.dataset.accessUser)]; if (typeof toast === 'function') toast(`Permissões de ${user[0]} exibidas em modo demonstrativo.`); }));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
