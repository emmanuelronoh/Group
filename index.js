// Function to show different sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Function to open modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Retrieve form data
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // You would typically send this data to your server here
    alert('Login successful!');
    closeModal('loginModal');
    showSection('home');
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Retrieve form data
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // You would typically send this data to your server here
    alert('Sign up successful!');
    closeModal('signupModal');
    showSection('home');
});

// Handle forgot password form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Retrieve form data
    const email = document.getElementById('forgotPasswordEmail').value;

    // You would typically send this data to your server here
    alert('Password reset link sent!');
    closeModal('forgotPasswordModal');
});

// Array to hold cart items
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        total += item.price;
    });

    cartTotalElement.textContent = total.toFixed(2);
    document.getElementById('cartItemCount').textContent = cart.length;
}

// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
}

// Handle adding a new product
document.getElementById('addItemForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Retrieve form data
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const category = document.getElementById('itemCategory').value;
    const imageFile = document.getElementById('itemImage').files[0];

    if (!imageFile) {
        alert('Please upload an image.');
        return;
    }

    // Create a file reader to read the image
    const reader = new FileReader();
    reader.onload = function (e) {
        // Create a new product item and add it to the home content
        const productItem = {
            name: name,
            price: price,
            category: category,
            image: e.target.result
        };

        addToCart(productItem); // Add to cart for demonstration purposes

        const homeContent = document.getElementById('homeContent');
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <img src="${productItem.image}" alt="${productItem.name}">
            <h3>${productItem.name}</h3>
            <p>$${productItem.price.toFixed(2)}</p>
            <button onclick="addToCart(${JSON.stringify(productItem)})">Add to Cart</button>
        `;
        homeContent.appendChild(productElement);

        // Clear the form and close the modal
        document.getElementById('addItemForm').reset();
        closeModal('addItemModal');
    };
    reader.readAsDataURL(imageFile);
});

// Handle checkout
function checkout() {
    alert('Proceeding to checkout...');
    cart = []; // Clear the cart after checkout
    updateCartDisplay();
}
// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Save the user's preference
    localStorage.setItem('dark-mode', isDarkMode);
}

// Function to apply the saved theme from localStorage
function applySavedTheme() {
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize theme on page load
applySavedTheme();

// Add event listener to the dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
