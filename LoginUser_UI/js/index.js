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