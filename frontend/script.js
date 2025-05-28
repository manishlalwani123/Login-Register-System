// Utility: Check authentication
async function checkAuth() {
  const res = await fetch('http://localhost:3000/check-auth', {
    credentials: 'include'
  });
  return await res.json();
}

// Index Page
if (window.location.pathname.endsWith('index.html')) {
  checkAuth().then(data => {
    if (data.loggedIn) {
      document.getElementById('status').textContent = `Logged in as ${data.user}`;
    } else {
      window.location.href = 'login.html';
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => window.location.href = 'login.html');
  });
}

// Login Page
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password')
      })
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('message').textContent = data.message || 'Login failed';
    }
  });
}

// Register Page
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password')
      })
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = 'login.html';
    } else {
      document.getElementById('message').textContent = data.message || 'Registration failed';
    }
  });
}

// Dashboard Page
if (window.location.pathname.endsWith('dashboard.html')) {
  checkAuth().then(data => {
    if (!data.loggedIn) {
      window.location.href = 'login.html';
    }
  });

  fetch('http://localhost:3000/users', { credentials: 'include' })
    .then(res => res.json())
    .then(users => {
      const tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = '';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${user.username}</td><td>${user.password}</td>`;
        tbody.appendChild(tr);
      });
    });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => window.location.href = 'login.html');
  });
}
