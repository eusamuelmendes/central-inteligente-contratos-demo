(() => {
  const aliases = {'plínio ferreira':'plinio.ferreira','plinio ferreira':'plinio.ferreira','deisi santos':'deisi.santos','edson ruiz':'edson.ruiz','helis almeida':'helis.almeida','joão':'joao','joao':'joao','felipe':'felipe','fernando nunes':'fernando.nunes','andré vieira':'andre.vieira','andre vieira':'andre.vieira'};
  const setup = () => { const form=document.getElementById('auth-form'); if(!form||form.dataset.compatReady)return; form.dataset.compatReady='true'; form.addEventListener('submit',()=>{const input=document.getElementById('auth-username');if(input)input.value=aliases[input.value.trim().toLocaleLowerCase('pt-BR')]||input.value.trim().toLowerCase();},true); };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setTimeout(setup,0);
})();
