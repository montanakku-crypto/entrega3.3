// app.js — inicializa a SPA, monta eventos e gerencia localStorage
import { render, getPath } from './router.js';
import { validateForm, showErrors, clearErrors } from './formValidation.js';

const STORAGE_KEY = 'entrega3_users';

function readStorage(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }catch(e){ return []; } }
function writeStorage(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function mountHandlers(){
  const app = document.getElementById('app');
  // navigation links
  document.querySelectorAll('[data-link]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      // allow hash change to trigger render
    });
  });

  // delegate events inside app
  app.addEventListener('submit', (ev)=>{
    if(ev.target && ev.target.id === 'userForm'){
      ev.preventDefault();
      const form = ev.target;
      clearErrors(form);
      const errors = validateForm(form);
      if(Object.keys(errors).length > 0){
        showErrors(form, errors);
        const first = Object.keys(errors)[0];
        const el = form.querySelector(`[name="${first}"]`);
        if(el) el.focus();
        return;
      }
      // collect and save
      const data = readStorage();
      const payload = { nome: form.nome.value.trim(), email: form.email.value.trim(), createdAt: new Date().toISOString() };
      data.unshift(payload);
      writeStorage(data);
      // re-render cadastro page
      location.hash = '#/cadastro';
    }
  });

  app.addEventListener('click', (ev)=>{
    const btn = ev.target.closest('[data-action]');
    if(!btn) return;
    const action = btn.dataset.action;
    if(action === 'delete'){
      const idx = Number(btn.dataset.index);
      const data = readStorage();
      if(!Number.isNaN(idx) && data[idx]){
        data.splice(idx,1);
        writeStorage(data);
        location.hash = '#/cadastro';
      }
    }
  });
}

// main render function
function renderApp(){
  const app = document.getElementById('app');
  const stored = readStorage();
  render(app, stored);
  // after DOM updated, mount form focus or other small behaviors
  setTimeout(()=>{
    const path = getPath();
    if(path === '/cadastro'){
      const form = document.getElementById('userForm');
      if(form) form.nome.focus();
    }
  }, 10);
}

window.addEventListener('hashchange', renderApp);
window.addEventListener('load', ()=>{
  renderApp();
  mountHandlers();
});
