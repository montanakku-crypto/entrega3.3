// templates.js — simples sistema de modelos (templates) em JS
export function homeTemplate(){ 
  return `
    <section class="card">
      <h1>Bem-vinda(o) à Minha Conta</h1>
      <p class="small">Esta demo atende ao trabalho: SPA, manipulação do DOM, templates JS, validação e localStorage.</p>
      <p class="small">Use o menu para navegar. O formulário salva dados localmente e exibe mensagens de erro quando necessário.</p>
    </section>
  `;
}

export function sobreTemplate(){ 
  return `
    <section class="card">
      <h2>Sobre o projeto</h2>
      <p class="small">Entrega 3 — Implementação de JavaScript avançado para transformar interface estática em SPA.</p>
      <ul class="small">
        <li>Manipulação do DOM</li>
        <li>Eventos e validação</li>
        <li>Armazenamento local (localStorage)</li>
        <li>Código modular</li>
      </ul>
    </section>
  `;
}

export function cadastroTemplate(saved=[]){ 
  const rows = saved.length === 0 ? '<p class="small">Nenhum usuário cadastrado.</p>' : saved.map((u,i)=>`
    <div class="list-item">
      <strong>${escapeHtml(u.nome)}</strong> — <span class="small">${escapeHtml(u.email)}</span>
      <div class="actions">
        <button class="link-like" data-action="delete" data-index="${i}">Excluir</button>
      </div>
    </div>
  `).join('');
  return `
    <section class="card">
      <h2>Cadastro de Usuários</h2>
      <form id="userForm" novalidate>
        <div class="form-row">
          <label for="nome">Nome</label>
          <input id="nome" name="nome" minlength="3" required />
          <div class="error" data-error-for="nome"></div>
        </div>
        <div class="form-row">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
          <div class="error" data-error-for="email"></div>
        </div>
        <button class="btn" type="submit">Salvar</button>
      </form>

      <h3 style="margin-top:16px">Usuários salvos</h3>
      <div id="savedList">${rows}</div>
    </section>
  `;
}

// helper
function escapeHtml(str=''){ return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }
