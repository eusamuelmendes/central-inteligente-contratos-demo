(() => {
  const key='central-contratos-demo-session';
  const getAccount=()=>{try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch{return null}};
  const managers=['Gerente comercial','Gerência'];
  const contacts=['Contato comercial'];
  const isManager=account=>Boolean(account&&managers.includes(account.role));
  const canOwn=account=>Boolean(account&&contacts.includes(account.role));
  const recordOwnerFromText=text=>['Plínio Ferreira','Deisi Santos','Edson Ruiz','Helis Almeida'].find(name=>text.includes(name));
  const apply=()=>{
    const account=getAccount(); if(!account) return;
    const manager=isManager(account); const own=canOwn(account);
    document.querySelectorAll('[data-op-edit]').forEach(button=>{const owner=recordOwnerFromText(button.closest('article,.closed-item')?.textContent||'');button.hidden=!(manager||(own&&owner===account.name));});
    document.querySelectorAll('[data-issue-edit],[data-issue-resolve]').forEach(button=>{const owner=recordOwnerFromText(button.closest('tr')?.textContent||'');button.hidden=!(manager||(own&&owner===account.name));});
    const newOpportunity=document.getElementById('new-opportunity'); if(newOpportunity&&!manager&&!own) newOpportunity.hidden=true;
    const newIssue=document.getElementById('new-billing-issue'); if(newIssue&&!manager&&!own) newIssue.hidden=true;
    let note=document.getElementById('permission-context-note');
    const commercial=document.getElementById('commercial');
    if(commercial&&!note){note=document.createElement('div');note.id='permission-context-note';note.className='permission-context-note';commercial.querySelector('.commercial-heading')?.after(note);}
    if(note) note.innerHTML=manager?`<strong>Acesso amplo demonstrativo · ${account.role}</strong><span>Você pode revisar e alterar registros comerciais de todos os contatos.</span>`:own?`<strong>Acesso restrito demonstrativo · ${account.name}</strong><span>Você pode alterar somente registros atribuídos ao seu próprio nome.</span>`:`<strong>Acesso de consulta demonstrativo · ${account.role}</strong><span>Você pode consultar a operação, mas não alterar dados de contatos comerciais.</span>`;
  };
  document.addEventListener('click',event=>{const account=getAccount();if(!account)return;const target=event.target.closest('[data-op-edit],[data-issue-edit],[data-issue-resolve]');if(!target)return;const owner=recordOwnerFromText(target.closest('article,.closed-item,tr')?.textContent||'');if(!isManager(account)&&(!canOwn(account)||owner!==account.name)){event.preventDefault();event.stopImmediatePropagation();if(typeof toast==='function')toast('Permissão restrita: este registro pertence a outro contato comercial.');}} ,true);
  document.addEventListener('click',event=>{const account=getAccount();if(!account)return;const target=event.target.closest('#new-opportunity,#new-billing-issue');if(!target||isManager(account)||canOwn(account))return;event.preventDefault();event.stopImmediatePropagation();if(typeof toast==='function')toast('Seu perfil possui acesso de consulta e não pode criar alterações comerciais.');},true);
  document.addEventListener('click',event=>{const target=event.target.closest('#new-opportunity');if(!target)return;const account=getAccount();if(!account||!canOwn(account)||isManager(account))return;setTimeout(()=>{const select=document.querySelector('#opportunity-form select[name="owner"]');if(select){select.value=account.name;select.disabled=true;}},30);});
  document.addEventListener('submit',event=>{const form=event.target;if(form.id!=='opportunity-form'&&form.id!=='billing-form')return;const account=getAccount();if(!account||isManager(account))return;if(!canOwn(account)){event.preventDefault();event.stopImmediatePropagation();if(typeof toast==='function')toast('Permissão restrita: seu perfil não pode salvar dados comerciais.');return;}const owner=form.querySelector('[name="owner"]')?.value;if(owner&&owner!==account.name){event.preventDefault();event.stopImmediatePropagation();if(typeof toast==='function')toast('Você só pode salvar registros atribuídos ao seu próprio nome.');}},true);
  const observer=new MutationObserver(apply); observer.observe(document.body,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else setTimeout(apply,250);
})();
