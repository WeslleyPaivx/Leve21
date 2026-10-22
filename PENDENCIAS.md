# Pendências antes de ativar as vendas

## Conteúdo
- [x] Textos do site revisados com base no e-book (33 p.) e no planner (28 p.) de outubro de 2026.
- [x] Prévia com páginas reais (capa e duas páginas do e-book, capa e Dia 01 do planner) em `public/previews/`.
- [ ] **Revisão por nutricionista.** O próprio e-book informa na capa que ainda não teve revisão profissional
      individual, e traz receitas com quantidades de ingredientes. Recomendado antes de vender em escala.
- [ ] **Página 32 do e-book** ("Checklist de revisão profissional", ficha para o responsável técnico):
      avaliar se deve ir para o cliente ou só para o(a) nutricionista revisor(a).
- [ ] Depois da revisão, atualizar a frase do rodapé do site sobre revisão profissional.
- [ ] Os PDFs **não** devem ser colocados na pasta `public/` do site: tudo que está lá fica público e gratuito.
      A entrega é só pela área de membros da Cakto.

## Cakto
- [ ] Criar/confirmar o produto e a oferta de **R$ 39,90** e copiar o link do checkout para `VITE_CAKTO_CHECKOUT_URL`.
- [ ] Conferir se o preço exibido (`VITE_PRICE`) é igual ao da oferta.
- [ ] Confirmar o prazo de garantia configurado na Cakto e ajustar `VITE_GUARANTEE_DAYS` (vazio = oculto).
- [ ] Configurar a **Cakto Members** com os dois PDFs e fazer uma compra de teste para validar o e-mail de acesso.
- [ ] Confirmar no painel quais parâmetros de rastreio a Cakto registra além de `utm_source`, `utm_medium`, `utm_campaign`.

## Informações legais
- [ ] Preencher `VITE_LEGAL_NAME`, `VITE_LEGAL_DOCUMENT` (CPF/CNPJ conforme o caso) e `VITE_CONTACT_EMAIL`.
- [ ] Avaliar com assessoria se são necessários Termos de Uso e Política de Privacidade completos
      (o site não coleta dados nem usa cookies de rastreamento; se pixels de anúncio forem adicionados, isso muda).

## Publicação
- [ ] Criar o repositório no GitHub e conectar à Netlify (passo a passo no README).
- [ ] Testar o site publicado em iPhone e Android, inclusive dentro do navegador do Instagram e do TikTok.
