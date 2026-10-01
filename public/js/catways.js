/**
 * Charge et affiche la liste des catways depuis l'API.
 */
async function loadCatways() {
  const response = await fetch('/catways');
  const catways = await response.json();
  const tbody = document.querySelector('#catwaysTable tbody');
  tbody.innerHTML = '';

  catways.forEach((catway) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${catway.catwayNumber}</td>
      <td>${catway.catwayType}</td>
      <td>
        <input type="text" value="${catway.catwayState}" data-number="${catway.catwayNumber}" class="stateInput">
      </td>
      <td>
        <button data-number="${catway.catwayNumber}" class="updateBtn">Modifier</button>
        <button data-number="${catway.catwayNumber}" class="deleteBtn">Supprimer</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll('.updateBtn').forEach((btn) => {
    btn.addEventListener('click', updateCatway);
  });
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', deleteCatway);
  });
}

/**
 * Modifie l'état d'un catway.
 * @param {Event} event
 */
async function updateCatway(event) {
  const number = event.target.dataset.number;
  const input = document.querySelector(`.stateInput[data-number="${number}"]`);
  await fetch(`/catways/${number}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ catwayState: input.value })
  });
  loadCatways();
}

/**
 * Supprime un catway.
 * @param {Event} event
 */
async function deleteCatway(event) {
  const number = event.target.dataset.number;
  if (!confirm(`Supprimer le catway ${number} ?`)) return;
  await fetch(`/catways/${number}`, { method: 'DELETE' });
  loadCatways();
}

document.getElementById('createForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const catwayNumber = document.getElementById('catwayNumber').value;
  const catwayType = document.getElementById('catwayType').value;
  const catwayState = document.getElementById('catwayState').value;

  await fetch('/catways', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ catwayNumber, catwayType, catwayState })
  });

  event.target.reset();
  loadCatways();
});

loadCatways();