document.addEventListener("DOMContentLoaded", function () {
    if (typeof produtos === 'undefined' || !Array.isArray(produtos)) {
        console.error("Erro: A lista de produtos não foi carregada corretamente.");
        return;
    }
  
    let cesto = JSON.parse(localStorage.getItem("cesto")) || []; // Recuperar cesto do LocalStorage
  
    const produtosContainer = document.getElementById("produtos-container");
    const carrinhoContainer = document.getElementById("carrinho-container");
    const custoTotalEl = document.getElementById("custo-total");
  
    // Renderizar produtos
    function displayProducts() {
        produtosContainer.innerHTML = ""; // Limpar produtos anteriores
        produtos.forEach(produto => {
            const produtoEl = document.createElement("article");
            produtoEl.className = "produto";
            produtoEl.innerHTML = `
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>${produto.description}</p>
                <p><strong>Preço:</strong> ${produto.price.toFixed(2)} €</p>
                <button onclick="adicionarAoCesto(${produto.id})">+ Adicionar ao Cesto</button>
            `;
            produtosContainer.appendChild(produtoEl);
        });
    }
  
    // Adicionar ao cesto
    window.adicionarAoCesto = function (id) {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            cesto.push(produto);
            atualizarLocalStorage(); // Atualizar LocalStorage
            displayCart();
        }
    };
  
    // Renderizar cesto
    function displayCart() {
        carrinhoContainer.innerHTML = "";
        let custoTotal = 0;
  
        if (cesto.length === 0) {
            carrinhoContainer.innerHTML = "<p>O cesto está vazio.</p>";
        } else {
            cesto.forEach(produto => {
                custoTotal += produto.price;
  
                const carrinhoItem = document.createElement("article");
                carrinhoItem.className = "produto";
                carrinhoItem.innerHTML = `
                    <img src="${produto.image}" alt="${produto.title}">
                    <h3>${produto.title}</h3>
                    <p><strong>Preço:</strong> ${produto.price.toFixed(2)} €</p>
                    <button onclick="removerDoCesto(${produto.id})">- Remover do Cesto</button>
                `;
                carrinhoContainer.appendChild(carrinhoItem);
            });
        }
  
        // Atualizar custo total no elemento HTML
        custoTotalEl.textContent = `Custo total: ${custoTotal.toFixed(2)} €`;
    }
  
    // Remover do cesto
    window.removerDoCesto = function (id) {
        cesto = cesto.filter(p => p.id !== id);
        atualizarLocalStorage(); // Atualizar LocalStorage
        displayCart();
    };
  
    // Atualizar LocalStorage
    function atualizarLocalStorage() {
        localStorage.setItem("cesto", JSON.stringify(cesto));
    }
  
    // Inicializar
    displayProducts();
    displayCart();
  });
  