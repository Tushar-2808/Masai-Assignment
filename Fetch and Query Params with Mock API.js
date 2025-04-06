document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const productsGrid = document.getElementById('products');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    searchBtn.addEventListener('click', fetchProducts);
    
    async function fetchProducts() {
        // Get filter values
        const category = document.getElementById('category').value;
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        const sort = document.getElementById('sort').value;
        
        // Show loading state
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        productsGrid.innerHTML = '';
        
        try {
            // Build API URL with query parameters
            let apiUrl = 'https://mockapi.io/products?';
            
            if (category) apiUrl += `category=${category}&`;
            if (minPrice) apiUrl += `min_price=${minPrice}&`;
            if (maxPrice) apiUrl += `max_price=${maxPrice}&`;
            if (sort) apiUrl += `sort=${sort}&`;
            
            // Remove trailing '&' or '?' if no params
            apiUrl = apiUrl.replace(/[&?]$/, '');
            
            // Fetch data from API
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const products = await response.json();
            
            // Display products
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            errorElement.classList.remove('hidden');
        } finally {
            loadingElement.classList.add('hidden');
        }
    }
    
    function displayProducts(products) {
        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
            return;
        }
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image || 'https://via.placeholder.com/250'}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
});
