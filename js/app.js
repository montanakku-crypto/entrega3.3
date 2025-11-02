import { render, getPath } from './router.js';
import { validateForm, showErrors, clearErrors } from './formValidation.js';
const STORAGE_KEY='entrega3_users';
function readStorage(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[];}catch(e){return []}}
function writeStorage(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function mountHandlers(){
  const app=document.getElementById('main')||document.getElementById('app')||document.querySelector('#main');
  // nav buttons
  document.querySelectorAll('.nav-btn').forEach(b=>{
    b.addEventListener('click', ()=>{ location.hash = b.dataset.page; });
    b.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' ') { e.preventDefault(); location.hash = b.dataset.page; } });
  });
  // theme toggles
  const toggleDark=document.getElementById('toggle-dark');
  const toggleContrast=document.getElementById('toggle-contrast');
  if(toggleDark){ toggleDark.addEventListener('change', ()=>{ document.body.setAttribute('data-theme', toggleDark.checked? 'dark':'light'); }); }
  if(toggleContrast){ toggleContrast.addEventListener('change', ()=>{ document.body.setAttribute('data-contrast', toggleContrast.checked? 'high':''); if(toggleContrast.checked) document.body.classList.add('high-contrast'); else document.body.classList.remove('high-contrast'); }); }
  // delegations
  const container=document.getElementById('main')||document.getElementById('app')||document.querySelector('.container');
  container.addEventListener('submit', (ev)=>{
    if(ev.target && ev.target.id==='userForm'){ ev.preventDefault(); const form=ev.target; clearErrors(form); const errors=validateForm(form); if(Object.keys(errors).length>0){ showErrors(form, errors); const first=Object.keys(errors)[0]; const el=form.querySelector(`[name="${first}"]`); if(el) el.focus(); return; } const data=readStorage(); data.unshift({nome:form.nome.value.trim(), email:form.email.value.trim(), createdAt: new Date().toISOString()}); writeStorage(data); location.hash = '#/cadastro'; }
  });
  container.addEventListener('click', (ev)=>{ const btn=ev.target.closest('[data-action]'); if(!btn) return; const action=btn.dataset.action; if(action==='delete'){ const idx=Number(btn.dataset.index); const data=readStorage(); if(!Number.isNaN(idx) && data[idx]){ data.splice(idx,1); writeStorage(data); location.hash = '#/cadastro'; } } });
  // keyboard focus visible for interactive elements
  document.addEventListener('keydown', (e)=>{ if(e.key==='Tab'){ document.body.classList.add('user-is-tabbing'); } });
}
function renderApp(){
  const appEl = document.getElementById('main');
  const stored = readStorage();
  render(appEl, stored);
  setTimeout(()=>{
    const path = getPath();
    if(path==='/cadastro'){ const form=document.getElementById('userForm'); if(form) form.nome.focus(); }
    if(appEl) appEl.focus();
  },10);
}
window.addEventListener('hashchange', renderApp);
window.addEventListener('load', ()=>{ renderApp(); mountHandlers(); });