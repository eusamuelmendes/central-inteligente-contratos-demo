(() => {
  const accounts = {
    'plínio ferreira':['Plínio Ferreira','plinio.ferreira','Contato comercial',false], 'plinio ferreira':['Plínio Ferreira','plinio.ferreira','Contato comercial',false],
    'deisi santos':['Deisi Santos','deisi.santos','Contato comercial',false], 'edson ruiz':['Edson Ruiz','edson.ruiz','Contato comercial',false], 'helis almeida':['Helis Almeida','helis.almeida','Contato comercial',false],
    'joão':['João','joao','OPEC',false], 'joao':['João','joao','OPEC',false], 'felipe':['Felipe','felipe','Financeiro',false],
    'fernando nunes':['Fernando Nunes','fernando.nunes','Gerente comercial',true], 'andre vieira':['André Vieira','andre.vieira','Gerência',true], 'andré vieira':['André Vieira','andre.vieira','Gerência',true]
  };
  const setup=()=>{const button=document.querySelector('#auth-form button[type="submit"]');if(!button||button.dataset.fallbackReady)return;button.dataset.fallbackReady='true';button.addEventListener('click',event=>{const user=document.getElementById('auth-username')?.value.trim().toLocaleLowerCase('pt-BR');const password=document.getElementById('auth-password')?.value;if(password!=='sbt123'||!accounts[user])return;event.preventDefault();event.stopImmediatePropagation();const item=accounts[user];sessionStorage.setItem('central-contratos-demo-session',JSON.stringify({name:item[0],username:item[1],role:item[2],password:'sbt123',canUsers:item[3]}));window.location.reload();},true);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setTimeout(setup,0);
})();
