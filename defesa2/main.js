document.addEventListener("DOMContentLoaded", function () {
  let cart = []; // Inicializar o cesto
  let products = []; // Para armazenar os produtos carregados
  let categories = []; // Para armazenar as categorias carregadas

  // Função para carregar e exibir os produtos
  function displayProducts(filteredProducts) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Limpar produtos anteriores
    const cartContainer = document.getElementById("cart-container");


    if (filteredProducts.length === 0) {
      productContainer.innerHTML = "<p>Não há produtos disponíveis.</p>";
    }

    filteredProducts.forEach(product => {
      const productCard = document.createElement("article");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="Imagem de ${product.name}">
        <p><strong>Preço:</strong> $${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="cart-button">${isInCart(product) ? "Remover do Cesto" : "Adicionar ao Cesto"}</button>
        <button class="cartAll-button">${isInCart(product) ? "Remover tudo do Cesto" : "Adicionar tudo ao Cesto"}</button>
      `;

      filteredProducts.forEach(product => {
        const cartCard = document.createElement("article");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="Imagem de ${product.name}">
          <p><strong>Preço:</strong> $${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <button class="cart-button">${isInCart(product) ? "Remover do Cesto" : "Adicionar ao Cesto"}</button>
          <button class="cartAll-button">${isInCart(product) ? "Remover tudo do Cesto" : "Adicionar tudo ao Cesto"}</button>
        `;

      

      // Evento do botão para adicionar/remover do cesto
      const cartButton = productCard.querySelector(".cart-button");
      cartButton.addEventListener("click", function () {
        if (isInCart(product)) {
          cart = cart.filter(item => item.id !== product.id);
          cartButton.textContent = "Adicionar ao Cesto";
        } else {
          cart.push(product);
          cartButton.textContent = "Remover do Cesto";
        }
        displayCart(); // Atualizar o cesto
      });

      
      productContainer.appendChild(productCard); // Adiciona ao container
    });
  }

  // Função para verificar se um produto está no cesto
  function isInCart(product) {
    return cart.some(item => item.id === product.id); // Verificar por ID
  }

  // Função para filtrar produtos
  function filterProducts() {
    let filteredProducts = products;

    // Filtrar por categoria
    const category = document.getElementById("category-filter").value;
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Filtrar por preço
    const priceOrder = document.getElementById("price-filter").value;
    if (priceOrder === "asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "desc") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    const rateOrder = document.getElementById("rate-filter").value;
    if (rateOrder === "asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.rate - b.rate);
    } else if (priceOrder === "desc") {
      filteredProducts = filteredProducts.sort((a, b) => b.rate - a.rate);
    }

    // Filtrar por nome
    const searchQuery = document.getElementById("search-input").value.toLowerCase();
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery),
        product.description.includes(searchQuery)
      );
    }

    displayProducts(filteredProducts); // Exibir produtos filtrados
  }

  // Carregar categorias da API
  fetch('https://deisishop.pythonanywhere.com/categories/')
    .then(response => response.json())
    .then(data => {
      categories = data;
      // Preencher o filtro de categorias
      const categoryFilter = document.getElementById("category-filter");
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category; // Usando o nome da categoria em minúsculo para comparação
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    })
    .catch(error => console.log('Erro ao carregar categorias:', error));

  // Carregar produtos da API
  fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => response.json())
    .then(data => {
      products = data;
      displayProducts(products); // Exibir os produtos carregados
    })
    .catch(error => console.log('Erro ao carregar produtos:', error));

  // Adicionar event listeners para os filtros
  document.getElementById("category-filter").addEventListener("change", filterProducts);
  document.getElementById("price-filter").addEventListener("change", filterProducts);
  document.getElementById("search-input").addEventListener("input", filterProducts);
});
