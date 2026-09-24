# Central Inteligente de Contratos

Interface funcional de demonstração para o fluxo de OPEC: receber documento, processar, conferir, aprovar e registrar o envio.

## Executar

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático.

## Modo demonstração

Esta entrega implementa a experiência de ponta a ponta no navegador, incluindo upload local, simulação determinística do processamento, validação visual, edição de campos, aprovação e histórico. O lançamento externo não é real.

## Próxima camada de produção

- Substituir `app.js` por chamadas a uma API autenticada.
- Implementar `OcrProvider` para Azure Document Intelligence, Google Document AI ou AWS Textract.
- Persistir o modelo em PostgreSQL/Drizzle com `users`, `scan_sessions`, `contracts`, `contract_pages`, `extracted_fields`, `contract_submissions`, `audit_logs` e `integration_settings`.
- Adicionar storage S3/R2 com URLs temporárias e política de retenção.
- Criar `ContractIntegrationAdapter` com `validateContract`, `sendContract`, `checkStatus`, `retry` e `cancelPendingSubmission`.
- Configurar autenticação, perfis Operador/Supervisor/Administrador e variáveis de ambiente.

As referências visuais do briefing foram mantidas como direção de produto; os assets do Pinterest não são usados como hotlink.
