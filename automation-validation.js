(() => {
  const setup = () => {
    const root=document.getElementById('automation-opec');
    if(!root||root.dataset.validationRefined) return;
    root.dataset.validationRefined='true';
    const subtitle=root.querySelector('.automation-heading .muted'); if(subtitle) subtitle.textContent='Prepare, valide e envie dados para o sistema OPEC com segurança.';
    const notice=root.querySelector('.automation-notice'); if(notice) notice.innerHTML='<strong>Área de preparação para transferência</strong><span>Esta etapa valida e organiza os dados para o sistema OPEC. A transferência e o lançamento externo serão ativados posteriormente.</span>';
    const replacements={'Solicitações para lançamento':'Solicitações para transferência','Validação do lançamento':'Validação para transferência','Fila de lançamento de contratos':'Fila de transferência para o sistema OPEC'};
    root.querySelectorAll('h1,h2,h3,button,strong,span,small').forEach(node=>{const text=node.textContent.trim();if(replacements[text]) node.textContent=replacements[text];});
    const action=root.querySelector('.automation-actions');
    if(action){const card=document.createElement('div');card.className='validation-scope';card.innerHTML='<strong>Validações disponíveis agora</strong><ul><li>Completude dos dados obrigatórios</li><li>Documentos e condições comerciais</li><li>Responsável e contato comercial</li><li>Separação entre contrato e transferência</li><li>Prontidão para o sistema OPEC</li></ul>';action.append(card);}
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setTimeout(setup,0);
})();
