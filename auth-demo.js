(() => { if (window.DISABLE_DEMO_AUTH) return;
  const accounts = [
    { name:'Plínio Ferreira', username:'plinio.ferreira', role:'Contato comercial', password:'sbt123', canUsers:false },
    { name:'Deisi Santos', username:'deisi.santos', role:'Contato comercial', password:'sbt123', canUsers:false },
    { name:'Edson Ruiz', username:'edson.ruiz', role:'Contato comercial', password:'sbt123', canUsers:false },
    { name:'Helis Almeida', username:'helis.almeida', role:'Contato comercial', password:'sbt123', canUsers:false },
    { name:'João', username:'joao', role:'OPEC', password:'sbt123', canUsers:false },
    { name:'Felipe', username:'felipe', role:'Financeiro', password:'sbt123', canUsers:false },
    { name:'Fernando Nunes', username:'fernando.nunes', role:'Gerente comercial', password:'sbt123', canUsers:true },
    { name:'André Vieira', username:'andre.vieira', role:'Gerência', password:'sbt123', canUsers:true }
  ];
  const sessionKey='central-contratos-demo-session';
  const initials=name=>name.split(' ').map(part=>part[0]).slice(0,2).join('').toUpperCase();
  const renderLogin=()=>{
    document.body.classList.add('auth-locked');
    if(document.getElementById('auth-screen')) return;
    const screen=document.createElement('main'); screen.id='auth-screen'; screen.className='auth-screen';
    screen.innerHTML=`<section class="auth-card"><div class="auth-brand"><span>◈</span><div><strong>OPEC</strong><small>Central Inteligente de Contratos</small></div></div><div class="auth-heading"><p class="eyebrow">ACESSO AO SISTEMA · DEMONSTRAÇÃO</p><h1>Entrar na Central</h1><p>Use um dos acessos demonstrativos para visualizar as permissões de cada área.</p></div><form id="auth-form"><label>Usuário<input id="auth-username" autocomplete="username" required placeholder="Ex.: joao ou fernando.nunes"></label><label>Senha<input id="auth-password" type="password" autocomplete="current-password" required placeholder="Senha demonstrativa"></label><button class="primary" type="submit">Entrar no sistema <span>→</span></button><p class="auth-error" id="auth-error" role="alert"></p></form><div class="auth-demo-note"><strong>Acessos demonstrativos</strong><span>Senha base para todos: <code>sbt123</code></span></div><div class="auth-accounts">${accounts.map(account=>`<button type="button" data-demo-username="${account.username}"><span class="auth-avatar">${initials(account.name)}</span><span><strong>${account.name}</strong><small>${account.role} · ${account.username}</small></span></button>`).join('')}</div><small class="auth-footnote">Todos os dados são fictícios. A autenticação real será configurada posteriormente.</small></section>`;
    document.body.append(screen);
    screen.querySelectorAll('[data-demo-username]').forEach(button=>button.addEventListener('click',()=>{screen.querySelector('#auth-username').value=button.dataset.demoUsername;screen.querySelector('#auth-password').value='sbt123';screen.querySelector('#auth-password').focus();}));
    screen.querySelector('#auth-form').addEventListener('submit',event=>{event.preventDefault();const username=screen.querySelector('#auth-username').value.trim().toLowerCase();const password=screen.querySelector('#auth-password').value;const account=accounts.find(item=>item.username===username&&item.password===password);if(!account){screen.querySelector('#auth-error').textContent='Usuário ou senha demonstrativa inválidos.';return;} sessionStorage.setItem(sessionKey,JSON.stringify(account)); unlock(account);});
  };
  const unlock=account=>{document.body.classList.remove('auth-locked');document.getElementById('auth-screen')?.remove();document.querySelectorAll('.nav-item[data-roadmap-view="users"]').forEach(item=>item.hidden=!account.canUsers);const sidebarUser=document.querySelector('.sidebar-bottom .user');if(sidebarUser){sidebarUser.querySelector('span').textContent=initials(account.name);sidebarUser.querySelector('strong').textContent=account.name;sidebarUser.querySelector('small').textContent=account.role;}const avatar=document.querySelector('.top-actions .avatar');if(avatar) avatar.textContent=initials(account.name);const topActions=document.querySelector('.top-actions');if(topActions&&!topActions.querySelector('[data-logout]')){const button=document.createElement('button');button.className='auth-logout';button.dataset.logout='true';button.textContent='Sair';button.addEventListener('click',()=>{sessionStorage.removeItem(sessionKey);location.reload();});topActions.append(button);}};
  const init=()=>{const stored=sessionStorage.getItem(sessionKey);if(stored){try{unlock(JSON.parse(stored));return;}catch{sessionStorage.removeItem(sessionKey);}}renderLogin();};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
