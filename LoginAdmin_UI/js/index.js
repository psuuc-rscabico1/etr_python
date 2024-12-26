// Initialize productIdCounter from localStorage, or set to 1 if not yet set
let productIdCounter = localStorage.getItem('productIdCounter') || 1;
let isEditing = false; // Flag to track if we're editing a product
let editingProductId = null; // Store the product ID being edited

const products = [];

// Handle Navigation Clicks
document.getElementById('homeLink').addEventListener('click', function() {
    showContent('home');
});

document.getElementById('managementLink').addEventListener('click', function() {
    showContent('management');
});

document.getElementById('aboutLink').addEventListener('click', function() {
    showContent('about');
});

document.getElementById('logoutLink').addEventListener('click', function() {
    showContent('logout');
});

// JavaScript to add active class to clicked link
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(item => item.classList.remove('active'));
        
        // Add active class to the clicked link
        link.classList.add('active');
    });
});


// Show relevant content based on clicked link
function showContent(contentId) {
    const sections = ['home', 'management', 'about', 'logout'];
    sections.forEach(function(section) {
        document.getElementById(section + 'Content').style.display = 'none';
    });

    document.getElementById(contentId + 'Content').style.display = 'block';
}

// Add Product to List
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productStock = document.getElementById('productStock').value;
    const productCategory = document.getElementById('productCategory').value;
    const productStatus = document.getElementById('productStatus').value;

    // Validation for empty fields
    let valid = true;

    // Check if required fields are filled
    if (!productName) {
        document.getElementById('productNameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('productNameError').style.display = 'none';
    }

    if (!productDescription) {
        document.getElementById('productDescriptionError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('productDescriptionError').style.display = 'none';
    }

    if (!productPrice || !/^\d*\.?\d*$/.test(productPrice)) {
        document.getElementById('priceError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('priceError').style.display = 'none';
    }

    if (!productStock || !/^\d+$/.test(productStock)) {
        document.getElementById('stockError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('stockError').style.display = 'none';
    }

    if (!productCategory) {
        document.getElementById('categoryError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('categoryError').style.display = 'none';
    }

    if (!productStatus) {
        document.getElementById('statusError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('statusError').style.display = 'none';
    }

    // If form is valid, proceed with adding or updating product
    if (valid) {
        if (isEditing) {
            // Update existing product (edit mode)
            const product = products.find(p => p.productId === editingProductId);
            product.name = productName;
            product.description = productDescription;
            product.price = productPrice;
            product.stock = productStock;
            product.category = productCategory;
            product.status = productStatus;

            // Reset editing flag and product ID
            isEditing = false;
            editingProductId = null;
        } else {
            // Create new product object (add mode)
            const newProduct = {
                productId: productIdCounter++,
                name: productName,
                description: productDescription,
                price: productPrice,
                stock: productStock,
                category: productCategory,
                status: productStatus
            };

            // Add product to the products array
            products.push(newProduct);

            // Update product ID counter in localStorage
            localStorage.setItem('productIdCounter', productIdCounter);
        }

        // Update the product list table
        updateProductTable();

        // Clear the form fields
        document.getElementById('productForm').reset();
    }
});

// Update Product Table
function updateProductTable() {
    const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(function(product) {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>${product.status}</td>
            <td>
                <button onclick="editProduct(${product.productId})">Edit</button>
                <button class="delete" onclick="deleteProduct(${product.productId})">Delete</button>
            </td>
        `;
    });
}

// Edit Product
function editProduct(productId) {
    const product = products.find(p => p.productId === productId);

    document.getElementById('productId').value = product.productId;
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStatus').value = product.status;

    // Set editing mode and store the product ID being edited
    isEditing = true;
    editingProductId = productId;
}

// Delete Product
function deleteProduct(productId) {
    const productIndex = products.findIndex(p => p.productId === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1); // Remove product from the array
        updateProductTable(); // Update the product list in the table
    }

    // Update the product ID counter if there are still products
    if (products.length === 0) {
        // If no products are left, reset productIdCounter to 1
        productIdCounter = 1;
    } else {
        // Otherwise, get the next available ID
        productIdCounter = Math.max(...products.map(p => p.productId)) + 1;
    }
    
    // Store updated productIdCounter in localStorage
    localStorage.setItem('productIdCounter', productIdCounter);
}

// Delete All Products
function deleteAllProducts() {
    // Clear all products
    products.length = 0;
    updateProductTable(); // Update the product list

    // Reset the product ID counter to 1
    productIdCounter = 1;
    localStorage.setItem('productIdCounter', productIdCounter);
}


// Show content when clicking on navigation links
document.getElementById('homeLink').addEventListener('click', function() {
    showContent('home');
});

document.getElementById('managementLink').addEventListener('click', function() {
    showContent('management');
});

document.getElementById('aboutLink').addEventListener('click', function() {
    showContent('about');
});

document.getElementById('logoutLink').addEventListener('click', function() {
    showContent('logout');
});

// Show relevant content based on clicked link
function showContent(contentId) {
    const sections = ['home', 'management', 'about', 'logout'];
    sections.forEach(function(section) {
        document.getElementById(section + 'Content').style.display = 'none';
    });

    document.getElementById(contentId + 'Content').style.display = 'block';
}

// Sample data for customers
let customers = [
    { id: "C001", fullName: "John Doe", email: "john.doe@example.com", phone: "123456789", address: "123 Main St", status: "Active", registrationDate: "2024-01-01" },
    { id: "C002", fullName: "Jane Smith", email: "jane.smith@example.com", phone: "987654321", address: "456 Oak St", status: "Inactive", registrationDate: "2024-02-01" }
];

// Show the tab content
function showTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    // Show the selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}

// Logout function
function logout() {
    alert('Logging out...');
    window.location.href = 'login.html'; // Redirect to the login page (replace with your actual login page URL)
}

// Add or Update customer
function addOrUpdateCustomer() {
    const customerId = document.getElementById('customer-id').value;
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const status = document.getElementById('status').value;
    const registrationDate = document.getElementById('registration-date').value;

    if (!customerId) {
        // Adding a new customer
        const newCustomer = {
            id: `C00${customers.length + 1}`,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            status: status,
            registrationDate: registrationDate
        };
        customers.push(newCustomer);
    } else {
        // Updating an existing customer
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            customer.fullName = fullName;
            customer.email = email;
            customer.phone = phone;
            customer.address = address;
            customer.status = status;
            customer.registrationDate = registrationDate;
        }
    }

    // Clear form and refresh the customer list
    document.getElementById('customer-form').reset();
    document.getElementById('customer-id').value = '';
    loadCustomers();
}

// Edit customer
function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        document.getElementById('customer-id').value = customer.id;
        document.getElementById('full-name').value = customer.fullName;
        document.getElementById('email').value = customer.email;
        document.getElementById('phone').value = customer.phone;
        document.getElementById('address').value = customer.address;
        document.getElementById('status').value = customer.status;
        document.getElementById('registration-date').value = customer.registrationDate;
    }
}

// Delete customer
function deleteCustomer(id) {
    customers = customers.filter(c => c.id !== id);
    loadCustomers();
}

// Load customers into the table
function loadCustomers() {
    const tbody = document.querySelector('#customer-table tbody');
    tbody.innerHTML = ''; // Clear existing data

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.fullName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.status}</td>
            <td>${customer.registrationDate}</td>
            <td>
                <button onclick="editCustomer('${customer.id}')">Edit</button>
                <button onclick="deleteCustomer('${customer.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize
loadCustomers();

const customerForm = document.getElementById("customerForm");
const customerTable = document.getElementById("customerTable").getElementsByTagName('tbody')[0];
const customerData = [];

customerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customer = {
        id: customerData.length + 1,  // Auto-generate customer ID
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        status: document.getElementById("status").value,
        registrationDate: document.getElementById("registration-date").value
    };

    // Add customer to array
    customerData.push(customer);

    // Clear form
    customerForm.reset();

    // Update customer table
    updateCustomerTable();
});

function updateCustomerTable() {
    // Clear the table first
    customerTable.innerHTML = "";

    // Populate table with customer data
    customerData.forEach(customer => {
        const row = customerTable.insertRow();
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.fullName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.status}</td>
            <td>${customer.registrationDate}</td>
            <td><button onclick="deleteCustomer(${customer.id})">Delete</button></td>
        `;
    });
}

function deleteCustomer(customerId) {
    // Remove customer from the array
    const index = customerData.findIndex(c => c.id === customerId);
    if (index !== -1) {
        customerData.splice(index, 1);
        updateCustomerTable();
    }
}
