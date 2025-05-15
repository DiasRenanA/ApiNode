document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, userName, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert('Erro: Usuario já cadastrado');
      return;
    }

    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    alert('Erro no cadastro');
  }
});
