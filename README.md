# Central Inteligente de Contratos

Interface demonstrativa para o fluxo de OPEC: receber documento, processar, conferir, aprovar e registrar o envio. Inclui carteira comercial, pendências de faturamento e painéis financeiros e de metas.

## Executar

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático.

## Modo demonstração

Esta entrega implementa a experiência de ponta a ponta no navegador, incluindo upload local, simulação determinística do processamento, validação visual, edição de campos, aprovação e histórico. O lançamento externo não é real.

Na tela **Carteira comercial**, a primeira aba **Clientes** permite buscar e filtrar clientes fictícios, consultar contratos e saldos demonstrativos, abrir detalhes da conta, registrar ações ilustrativas e exportar uma lista CSV. A segunda aba **Oportunidades** preserva o pipeline existente: é possível cadastrar oportunidades ilustrativas, alterar responsável, valor potencial, próxima ação e etapa; avançar etapas; consultar oportunidades ganhas ou perdidas; e iniciar a captura de um documento a partir de uma oportunidade ganha. A captura ainda não cria um vínculo persistente com um contrato.

Na seção **Pendências de faturamento**, é possível cadastrar e editar casos em espera, notas fiscais rejeitadas, pagamentos em atraso e contratos cancelados; definir responsável, motivo, próxima ação e prazo; e marcar casos como resolvidos. Status do contrato, da nota fiscal e do pagamento não devem ser tratados como uma única informação no backend futuro.

Em **Relatórios**, há duas abas: **Visão financeira** e **Metas e comparativos**. Os valores são calculados a partir de uma base fixa de contratos inteiramente ilustrativos de janeiro a setembro de 2026. É possível filtrar por mês, contato e, na visão financeira, tipo de contrato; consultar contratado, faturado, recebido, saldo a faturar, composição bruto/líquido, evolução mensal e contratos de origem; exportar CSV e imprimir. A aba de metas compara mês, semestre calendário e ano, além de contatos, clientes e período anterior. As metas podem ser editadas para o recorte selecionado e são salvas apenas no navegador atual. Os resultados podem diferir das imagens conceituais anteriores para manter coerência entre os contratos e os totais.

Em **Exportar relatórios**, é possível escolher resumo executivo, contratos e faturamento, carteira comercial ou pendências e auditoria; filtrar o recorte; incluir contratos de origem, histórico, pendências, dados financeiros, gráficos e observações; visualizar uma prévia responsiva; e gerar arquivos demonstrativos em PDF, Excel, CSV ou JSON. Os arquivos são baixados localmente no navegador e os relatórios recentes ficam disponíveis durante a sessão. A tela **Contratos e faturamento** também possui atalhos para a exportação.

Os registros da carteira e as metas editadas são salvos em `localStorage` **apenas no navegador e dispositivo atual**. Os contratos dos relatórios são exemplos fixos no código, não lançamentos reais nem registros cadastrados na carteira. Não existe banco de dados compartilhado, autenticação, integração com faturamento ou sincronização entre usuários na versão publicada pelo GitHub Pages. Use somente dados ilustrativos. Os valores potenciais das oportunidades não são incluídos nos totais de contratos ou faturamento.

## Próxima camada de produção

- Substituir `app.js` por chamadas a uma API autenticada.
- Implementar `OcrProvider` para Azure Document Intelligence, Google Document AI ou AWS Textract.
- Persistir o modelo em PostgreSQL/Drizzle com `users`, `scan_sessions`, `contracts`, `contract_pages`, `extracted_fields`, `contract_submissions`, `audit_logs` e `integration_settings`.
- Adicionar storage S3/R2 com URLs temporárias e política de retenção.
- Criar `ContractIntegrationAdapter` com `validateContract`, `sendContract`, `checkStatus`, `retry` e `cancelPendingSubmission`.
- Configurar autenticação, perfis Operador/Supervisor/Administrador e variáveis de ambiente.

As referências visuais do briefing foram mantidas como direção de produto; os assets do Pinterest não são usados como hotlink.
