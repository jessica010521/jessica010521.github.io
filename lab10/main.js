document.addEventListener("DOMContentLoaded", function () {
  let cart = []; // Inicializar o cesto

  // Função para verificar se um produto está no cesto
  function isInCart(product) {
    return cart.some(item => item.id === product.id); // Verificar por ID
  }

  // Exibir os produtos carregados da API
  function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Limpar produtos anteriores

    products.forEach(product => {
      const productCard = document.createElement("article");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="Imagem de ${product.title}">
        <p><strong>Preço:</strong> $${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="cart-button">${isInCart(product) ? "Remover do Cesto" : "Adicionar ao Cesto"}</button>
      `;

      // Evento do botão para adicionar/remover do cesto
      const cartButton = productCard.querySelector(".cart-button");
      cartButton.addEventListener("click", function () {
        if (isInCart(product)) {
          // Remover do cesto
          cart = cart.filter(item => item.id !== product.id);
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
        const cartItem = document.createElement("article");
        cartItem.className = "product-card"; // Reutilizamos a mesma classe dos produtos
        cartItem.innerHTML = `
          <h3>${product.title}</h3>
          <img src="${product.image}" alt="Imagem de ${product.title}">
          <p><strong>Preço:</strong> $${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <button class="remove-button">Remover do Cesto</button>
        `;
  
        // Botão para remover do cesto
        const removeButton = cartItem.querySelector(".remove-button");
        removeButton.addEventListener("click", function () {
          cart = cart.filter(item => item.id !== product.id); // Remove do cesto
          displayProducts(products); // Atualiza a lista de produtos
          displayCart(); // Atualiza o cesto
        });
  
        cartContainer.appendChild(cartItem); // Adiciona ao container do cesto
      });
    }
  }
  

  // Carregar produtos da API
  fetch('https://deisishop.pythonanywhere.com/products/')
 .then(response=>response.json())
 .then(data=>displayProducts(data))
 .catch(error=>('Erro:',error));
});
