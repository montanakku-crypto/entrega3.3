// router.js — roteador hash simples
import { homeTemplate, sobreTemplate, cadastroTemplate } from './templates.js';

const routes = {
  '/': homeTemplate,
  '': homeTemplate,
  '/sobre': sobreTemplate,
  '/cadastro': cadastroTemplate
};

export function getPath(){
  return location.hash.slice(1).toLowerCase() || '/';
}

export function render(appEl, stored){
  const path = getPath();
  const tpl = routes[path] || (()=>`<h2>404</h2><p>Página não encontrada</p>`);
  const html = path === '/cadastro' ? tpl(stored) : tpl();
  appEl.innerHTML = html;
}
