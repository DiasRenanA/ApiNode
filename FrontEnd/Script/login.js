document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    try {
    console.log(userName,password)
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password })
    });

    if (!response.ok) {
      alert('Login inválido');
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Salva o token
    window.location.href = 'index.html'; // Redireciona para a página protegida
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro no login');
    console.log(error)
  }
});