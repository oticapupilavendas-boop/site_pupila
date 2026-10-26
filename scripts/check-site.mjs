import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const normalizedHtml = html.replaceAll('\\"', '"');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(html.startsWith('<!doctype html>'), 'index.html deve começar com doctype HTML5');
assert(/<html lang="pt-BR">/.test(normalizedHtml), 'o idioma pt-BR deve estar declarado');
assert(/<meta name="viewport"/.test(normalizedHtml), 'a meta viewport é obrigatória');
assert(/<main\b[^>]*id="conteudo"/.test(normalizedHtml), 'a página deve ter uma área main identificável');
assert(/class="skip-link"/.test(normalizedHtml), 'o link para pular ao conteúdo deve existir');
assert(!/data:image\/[\w.+-]+;base64,/.test(html), 'não deve haver imagem base64 embutida no HTML');
assert(fs.existsSync(path.join(root, 'assets')), 'a pasta assets deve existir');

const assetKeys = [...normalizedHtml.matchAll(/"(assets\/images\/[^"\\]+)"\s*:\s*"([^"]+)"/g)];
assert(assetKeys.length >= 1, 'o mapa de imagens deve existir');
for (const [, key, assetPath] of assetKeys) {
  assert(fs.existsSync(path.join(root, assetPath)), `arquivo de imagem ausente: ${assetPath}`);
  assert(!assetPath.includes('..'), `caminho de asset inválido: ${assetPath}`);
}

const imageTags = [...normalizedHtml.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
assert(imageTags.length > 0, 'o site deve conter imagens');
assert(imageTags.every((tag) => /\balt="[^"]*"/.test(tag)), 'todas as imagens devem ter alt');
assert(imageTags.every((tag) => /\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag)), 'todas as imagens devem ter width e height');

if (failures.length) {
  console.error(failures.map((failure) => `✗ ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ site checks passed (${imageTags.length} image tags, ${assetKeys.length} mapped assets)`);
}
