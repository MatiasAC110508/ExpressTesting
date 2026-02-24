const API_URL = 'http://localhost:3000/api/clients';
const clientForm = document.getElementById('clientForm');
const clientTableBody = document.getElementById('clientTableBody');

// Fetch and display all clients
async function fetchClients() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const clients = await response.json();
        renderTable(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
}

// Render the HTML table rows
function renderTable(clients) {
    clientTableBody.innerHTML = '';
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        row.innerHTML = `
            <td class="p-3 border">${client.codigo_cliente}</td>
            <td class="p-3 border">${client.nombre_cliente}</td>
            <td class="p-3 border">${client.nombre_contacto || 'N/A'}</td>
            <td class="p-3 border">${client.telefono}</td>
            <td class="p-3 border text-center">
                <button onclick="deleteClient(${client.codigo_cliente})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">Delete</button>
            </td>
        `;
        clientTableBody.appendChild(row);
    });
}

// Handle form submission (Create)
clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newClient = {
        codigo_cliente: parseInt(document.getElementById('clientId').value),
        nombre_cliente: document.getElementById('clientName').value,
        nombre_contacto: document.getElementById('contactName').value,
        telefono: document.getElementById('phone').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClient)
        });

        if (response.ok) {
            clientForm.reset();
            fetchClients(); // Refresh the table
        } else {
            console.error('Failed to create client');
        }
    } catch (error) {
        console.error('Error saving client:', error);
    }
});

// Delete a client
async function deleteClient(id) {
    if (!confirm(`Are you sure you want to delete client #${id}?`)) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        });
        
        if (response.ok) {
            fetchClients(); // Refresh the table
        } else {
            console.error('Failed to delete client');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
    }
}

// Initialize application
fetchClients();
