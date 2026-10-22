# Leve21 — página de vendas

Site estático do Leve21 (e-book + planner de 21 dias): Vite + React + TypeScript + Tailwind CSS v4.
Animações feitas com uma camada própria e leve (IntersectionObserver + um único loop de rolagem + CSS),
sem biblioteca externa — menos JavaScript, melhor carregamento no celular. Tudo respeita `prefers-reduced-motion`.

## Rodar localmente

```bash
npm install
cp .env.example .env   # preencha o link do checkout
npm run dev
```

`npm run build` gera a pasta `dist/`.

## Checkout (Cakto)

- Todos os botões de compra usam `VITE_CAKTO_CHECKOUT_URL` (checkout hospedado oficial, `https://pay.cakto.com.br/<id-da-oferta>`).
- Só são aceitos links `https://pay.cakto.com.br`. Sem link válido, os botões aparecem como **"Checkout em configuração"** — não existe checkout fictício.
- UTMs: repassa apenas `utm_source`, `utm_medium` e `utm_campaign` (os campos que a documentação da Cakto confirma nos pedidos). Para incluir outros, ajuste `VITE_CAKTO_FORWARD_PARAMS` depois de confirmar no painel da Cakto.
- O site não usa a API da Cakto, não tem backend e não armazena dados de pagamento.
- A entrega do e-book e do planner é feita pela **Cakto Members**, configurada no painel da Cakto.

## Deploy na Netlify (plano gratuito)

1. Suba este projeto para um repositório no GitHub.
2. Netlify → **Add new site → Import an existing project → GitHub** → escolha o repositório.
   O `netlify.toml` já define build (`npm run build`), pasta (`dist`) e Node 22.
3. **Site configuration → Environment variables**: cadastre as variáveis do `.env.example`.
4. **Deploys → Trigger deploy**. A partir daí, cada push na branch principal publica automaticamente.

Nenhum recurso pago é usado (sem functions, forms, banco ou add-ons).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Todos os textos | `src/content.ts` |
| Preço, garantia, contato, dados legais | variáveis de ambiente (`.env.example`) |
| Cores e fontes | `src/index.css` (bloco `@theme`) |
| Prévia com páginas reais | imagens em `public/previews/` + lista `previewImages` em `src/content.ts` |
| Vídeo de fundo do hero | `VITE_HERO_VIDEO_URL` / `VITE_HERO_POSTER_URL` |

Antes de vender, veja **PENDENCIAS.md**.
