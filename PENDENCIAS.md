# Pendências antes de ativar as vendas

## Conteúdo (obrigatório)
- [ ] **Revisar todos os textos de `src/content.ts` com base no e-book e no planner reais.** Os temas das semanas
      (Organizar / Cuidar / Sustentar), as respostas da seção "Talvez você se reconheça", as descrições dos pilares e
      os itens de cada material foram escritos a partir do briefing, sem acesso aos arquivos do produto.
- [ ] **Prévia:** substituir as composições ilustrativas por imagens reais das páginas (`public/previews/` +
      `previewImages`). Enquanto isso, a seção exibe "Visualização ilustrativa".
- [ ] Revisão do conteúdo do e-book por profissional de saúde habilitado(a), se ele trouxer orientações de
      alimentação, atividade física ou saúde mental.

## Cakto
- [ ] Criar/confirmar o produto e a oferta de **R$ 39,90** e copiar o link do checkout para `VITE_CAKTO_CHECKOUT_URL`.
- [ ] Conferir se o preço exibido (`VITE_PRICE`) é igual ao da oferta.
- [ ] Confirmar o prazo de garantia configurado na Cakto e ajustar `VITE_GUARANTEE_DAYS` (vazio = oculto).
- [ ] Configurar a **Cakto Members** com o e-book e o planner e fazer uma compra de teste para validar a entrega.
- [ ] Confirmar no painel quais parâmetros de rastreio a Cakto registra além de `utm_source`, `utm_medium`, `utm_campaign`.

## Informações legais
- [ ] Preencher `VITE_LEGAL_NAME`, `VITE_LEGAL_DOCUMENT` (CPF/CNPJ conforme o caso) e `VITE_CONTACT_EMAIL`.
- [ ] Avaliar com assessoria se são necessários Termos de Uso e Política de Privacidade completos
      (o site não coleta dados nem usa cookies de rastreamento; se pixels de anúncio forem adicionados, isso muda).

## Publicação
- [ ] Criar o repositório no GitHub e conectar à Netlify (passo a passo no README).
- [ ] Testar o site publicado em iPhone e Android, inclusive dentro do navegador do Instagram e do TikTok.
