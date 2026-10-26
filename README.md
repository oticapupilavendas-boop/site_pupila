# Ótica Pupila — site

Site estático da Ótica Pupila, em Joinville/SC, com navegação por rotas no hash, catálogo preparado para receber modelos e contato por telefone/WhatsApp.

## Desenvolvimento local

É necessário apenas Node.js 20 ou superior:

```bash
npm test
```

Para visualizar, abra `index.html` em um servidor estático local. Por exemplo, no Windows:

```powershell
npx --yes serve .
```

## Estrutura

- `index.html`: aplicação estática e conteúdo da prévia aprovada.
- `assets/`: imagens extraídas do HTML e referenciadas como arquivos reais.
- `scripts/check-site.mjs`: verificações leves de estrutura, acessibilidade básica e integridade dos assets.
- `.github/workflows/quality.yml`: executa `npm test` em Pull Requests e na branch `main`.
- `AGENTS.md`: fluxo obrigatório de Issues, branches, Pull Requests e publicação.

## Fluxo de mudanças

Abra uma Issue para cada correção, melhoria ou nova função. Trabalhe em branch própria, mencione a Issue no Pull Request e só publique após aprovação e merge. Consulte [AGENTS.md](AGENTS.md) antes de alterar o projeto.

## Observações

O conteúdo da prévia foi preservado. Os modelos de produtos e algumas marcas permanecem como áreas preparadas para atualização posterior, pois não havia dados oficiais suficientes para preenchê-los com segurança.
