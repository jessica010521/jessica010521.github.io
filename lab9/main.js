// main.js
document.addEventListener("DOMContentLoaded", function() {
    // Certifica-te de que o array produtos é importado do produtos.js
    if (typeof produtos === 'undefined' || !Array.isArray(produtos)) {
      console.error("Erro: A lista de produtos não foi carregada corretamente.");
      return;
    }
  
    let cart = []; // Inicializar o cesto
  
    // Função para verificar se um produto está no cesto
    function isInCart(product) {
      return cart.includes(product);
    }
  
    // Exibir os produtos do produtos.js
    function displayProducts(products) {
      const productContainer = document.getElementById("product-container");
      productContainer.innerHTML = "";  // Limpar produtos anteriores
      products.forEach(product => {
        const productCard = document.createElement("article");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <img src="${product.image}" alt="Imagem de ${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p><strong>Preço:</strong> $${product.price.toFixed(2)}</p>
          <button class="cart-button">${isInCart(product) ? "Remover do Cesto" : "Adicionar ao Cesto"}</button>
        `;
  
        // Evento do botão para adicionar/remover do cesto
        const cartButton = productCard.querySelector(".cart-button");
        cartButton.addEventListener("click", function() {
          if (isInCart(product)) {
            // Remover do cesto
            cart = cart.filter(item => item !== product);
            cartButton.textContent = "Adicionar ao Cesto";
          } else {
            // Adicionar ao cesto
            cart.push(product);
            cartButton.textContent = "Remover do Cesto";
          }
          displayCart(); // Atualizar o cesto
        });
  
        productContainer.appendChild(productCard);
      });
    }
  
    // Exibir o cesto
    function displayCart() {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = ""; // Limpar o cesto
  
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>O cesto está vazio.</p>";
      } else {
        cart.forEach(product => {
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
            <p>${product.title} - $${product.price.toFixed(2)}</p>
            <button class="remove-button">Remover</button>
          `;
  
          // Botão para remover do cesto
          const removeButton = cartItem.querySelector(".remove-button");
          removeButton.addEventListener("click", function() {
            cart = cart.filter(item => item !== product);
            displayProducts(produtos);  // Atualizar a lista de produtos para refletir o estado do cesto
            displayCart();  // Atualizar o cesto
          });
  
          cartContainer.appendChild(cartItem);
        });
      }
    }
  
    // Carregar e exibir os produtos na inicialização
    displayProducts(produtos);
    displayCart(); // Inicializar o cesto vazio
  });
  