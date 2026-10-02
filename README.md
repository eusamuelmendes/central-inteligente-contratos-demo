# Central Inteligente de Contratos

Interface demonstrativa para o fluxo de OPEC: receber documento, processar, conferir, aprovar e registrar o envio. Inclui uma carteira comercial e acompanhamento de pendências de faturamento.

## Executar

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático.

## Modo demonstração

Esta entrega implementa a experiência de ponta a ponta no navegador, incluindo upload local, simulação determinística do processamento, validação visual, edição de campos, aprovação e histórico. O lançamento externo não é real.

Na tela **Carteira comercial**, é possível cadastrar oportunidades ilustrativas, alterar responsável, valor potencial, próxima ação e etapa; avançar etapas; consultar oportunidades ganhas ou perdidas; e iniciar a captura de um documento a partir de uma oportunidade ganha. A captura ainda não cria um vínculo persistente com um contrato.

Na seção **Pendências de faturamento**, é possível cadastrar e editar casos em espera, notas fiscais rejeitadas, pagamentos em atraso e contratos cancelados; definir responsável, motivo, próxima ação e prazo; e marcar casos como resolvidos. Status do contrato, da nota fiscal e do pagamento não devem ser tratados como uma única informação no backend futuro.

Esses novos registros são salvos em `localStorage` **apenas no navegador e dispositivo atual**. Não existe banco de dados compartilhado, autenticação ou sincronização entre usuários na versão publicada pelo GitHub Pages. Use somente dados ilustrativos. Os valores potenciais das oportunidades não são incluídos nos totais de contratos ou faturamento.

## Próxima camada de produção

- Substituir `app.js` por chamadas a uma API autenticada.
- Implementar `OcrProvider` para Azure Document Intelligence, Google Document AI ou AWS Textract.
- Persistir o modelo em PostgreSQL/Drizzle com `users`, `scan_sessions`, `contracts`, `contract_pages`, `extracted_fields`, `contract_submissions`, `audit_logs` e `integration_settings`.
- Adicionar storage S3/R2 com URLs temporárias e política de retenção.
- Criar `ContractIntegrationAdapter` com `validateContract`, `sendContract`, `checkStatus`, `retry` e `cancelPendingSubmission`.
- Configurar autenticação, perfis Operador/Supervisor/Administrador e variáveis de ambiente.

As referências visuais do briefing foram mantidas como direção de produto; os assets do Pinterest não são usados como hotlink.
