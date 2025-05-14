const token = localStorage.getItem('token');

if (!token) {
  alert('Você precisa estar logado para acessar esta página');
  window.location.href = 'login.html';
}

// Opcional: botão de logout
document.getElementById('logout')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});
