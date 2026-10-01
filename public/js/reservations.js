/**
 * Charge et affiche les réservations d'un catway donné.
 * @param {string} catwayNumber - Numéro du catway à afficher.
 */
async function loadReservations(catwayNumber) {
  if (!catwayNumber) return;

  const response = await fetch(`/catways/${catwayNumber}/reservations`);
  const reservations = await response.json();
  const tbody = document.querySelector('#reservationsTable tbody');
  tbody.innerHTML = '';

  reservations.forEach((r) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${r.catwayNumber}</td>
      <td>${r.clientName}</td>
      <td>${r.boatName}</td>
      <td>${new Date(r.startDate).toLocaleDateString('fr-FR')}</td>
      <td>${new Date(r.endDate).toLocaleDateString('fr-FR')}</td>
      <td><button data-catway="${r.catwayNumber}" data-id="${r._id}" class="deleteBtn">Supprimer</button></td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', deleteReservation);
  });
}

/**
 * Supprime une réservation, puis recharge la liste affichée.
 * @param {Event} event
 */
async function deleteReservation(event) {
  const catwayNumber = event.target.dataset.catway;
  const id = event.target.dataset.id;
  if (!confirm('Supprimer cette réservation ?')) return;
  await fetch(`/catways/${catwayNumber}/reservations/${id}`, { method: 'DELETE' });
  loadReservations(document.getElementById('filterNumber').value);
}

document.getElementById('createForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const catwayNumber = document.getElementById('catwayNumber').value;
  const clientName = document.getElementById('clientName').value;
  const boatName = document.getElementById('boatName').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  await fetch(`/catways/${catwayNumber}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientName, boatName, startDate, endDate })
  });

  event.target.reset();
  document.getElementById('filterNumber').value = catwayNumber;
  loadReservations(catwayNumber);
});

document.getElementById('filterNumber').addEventListener('input', (event) => {
  loadReservations(event.target.value);
});