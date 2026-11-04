import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

for (const year of [2027, 2028]) {
  const mock = `const RealDate = Date; globalThis.Date = class extends RealDate { constructor(...args) { super(...(args.length ? args : ['${year}-01-01T12:00:00Z'])); } static now() { return new RealDate('${year}-01-01T12:00:00Z').getTime(); } };`;
  const result = spawnSync(process.execPath, ['--import', `data:text/javascript,${encodeURIComponent(mock)}`, fileURLToPath(new URL('./build-site.mjs', import.meta.url)), '--check'], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`Build varia com a data em ${year}: ${result.stderr || result.error}`);
}
console.log('✓ Build determinístico com datas simuladas em 2027 e 2028');
