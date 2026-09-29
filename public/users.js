/**
 * Charge et affiche la liste des utilisateurs.
 */
async function loadUsers() {
  const response = await fetch('/users');
  const users = await response.json();
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';

  users.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><button data-email="${user.email}" class="deleteBtn">Supprimer</button></td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', deleteUser);
  });
}

/**
 * Supprime un utilisateur.
 * @param {Event} event
 */
async function deleteUser(event) {
  const email = event.target.dataset.email;
  if (!confirm(`Supprimer l'utilisateur ${email} ?`)) return;
  await fetch(`/users/${email}`, { method: 'DELETE' });
  loadUsers();
}

document.getElementById('createForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  event.target.reset();
  loadUsers();
});

loadUsers();