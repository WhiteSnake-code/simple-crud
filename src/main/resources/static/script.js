const API_URL = "/api/products";

// 1. Cargar productos al iniciar
document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    const tbody = document.getElementById("productTableBody");
    tbody.innerHTML = "";
    
    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>${p.quantity}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${p.id}, '${p.name}', ${p.price}, ${p.quantity})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>`;
    });
}

// 2. Guardar o Actualizar
async function saveProduct() {
    const id = document.getElementById("productId").value;
    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    resetForm();
    loadProducts();
}

// 3. Borrar
async function deleteProduct(id) {
    if (confirm("¿Are you sure you want to delete it?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadProducts();
    }
}

// 4. Preparar edición
function editProduct(id, name, price, quantity) {
    document.getElementById("productId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("quantity").value = quantity;
    document.getElementById("btnCancel").style.display = "inline";
}

function resetForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("btnCancel").style.display = "none";
}