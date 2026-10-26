# Instruções do projeto — Ótica Pupila

Estas regras são obrigatórias para qualquer agente ou pessoa que altere este site.

## Fluxo de mudanças

1. Toda correção, melhoria ou nova função deve ter uma Issue no GitHub antes do trabalho começar. A Issue deve explicar o objetivo, o contexto, os critérios de aceite e os riscos conhecidos.
2. Toda mudança deve ser feita em uma branch própria, nunca diretamente em `main`.
3. O Pull Request deve mencionar a Issue na descrição usando `Closes #<número>` ou `Refs #<número>` e deve registrar os testes executados.
4. A publicação em produção só pode acontecer depois da aprovação e do merge do Pull Request. Este repositório não autoriza deploy automático a partir de branches de trabalho.
5. Não incluir segredos, dados pessoais de clientes ou serviços pagos sem autorização explícita.

## Qualidade mínima

- Preservar o conteúdo e a identidade visual aprovados, salvo quando a Issue pedir alteração.
- Verificar responsividade, teclado, foco visível, texto alternativo e `prefers-reduced-motion`.
- Manter imagens como arquivos em `assets/`, evitando base64 no HTML.
- Executar `npm test` antes de abrir ou atualizar um Pull Request.
