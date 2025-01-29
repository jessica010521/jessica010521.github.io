let cesto = [];
let allProdutos = [];

// Seleciona os elementos do DOM
const cestoElemento = document.getElementById('cesto');
const listaCesto = cestoElemento.querySelector('.lista-produtos');
const precoTotalElemento = cestoElemento.querySelector('.preco-total');
const comprarBtn = document.getElementById('btn-comprar');
const mensagemCompraP = document.getElementById('mensagem-compra');
const produtosSection = document.getElementById('produtos');
const listaProdutos = produtosSection.querySelector('.lista-produtos');

// Seleciona os elementos do menu de filtros
const filtroCategoria = document.getElementById('filtro-categoria');
const ordenarPreco = document.getElementById('ordenar-preco');
const procurarProduto = document.getElementById('procurar-produto');

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o cesto a partir do localStorage
    inicializarCesto();

    // Carrega as categorias e os produtos via fetch
    fetchCategorias();
    fetchProdutos();

    // Adiciona event listeners aos elementos de filtro, ordenação e busca
    filtroCategoria.addEventListener('change', aplicarFiltros);
    ordenarPreco.addEventListener('change', aplicarFiltros);
    procurarProduto.addEventListener('input', aplicarFiltros);

    // Adiciona event listener para comprar
    comprarBtn.addEventListener('click', comprar);
});

// inicializa o cesto a partir do localStorage
function inicializarCesto() {
    cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    atualizarCesto();
}

//  buscar categorias da API
function fetchCategorias() {
    fetch('https://deisishop.pythonanywhere.com/categories/')
        .then(response => response.json())
        .then(categorias => {
            popularCategorias(categorias);
        })
        .catch(error => console.error('Erro ao buscar categorias:', error));
}

// dropdown de categorias
function popularCategorias(categorias) {
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategoria.appendChild(option);
    });
}

//  busca os produtos da API
function fetchProdutos() {
    fetch('https://deisishop.pythonanywhere.com/products/')
        .then(response => response.json())
        .then(produtos => {
            allProdutos = produtos;
            carregarProdutos(allProdutos);
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Função para carregar produtos na seção de produtos
function carregarProdutos(produtos) {
    listaProdutos.innerHTML = ''; 
    produtos.forEach(produto => {
        const artigoProduto = criarProduto(produto);
        listaProdutos.appendChild(artigoProduto);
    });
}

// cria um elemento de produto na seção de produtos
function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price.toFixed(2)} €`;
    preco.classList.add('preco');

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('descricao');

    const rating = document.createElement('p');
    rating.classList.add('rating');
    rating.innerHTML = gerarEstrelas(produto.rating.rate, produto.rating.count);

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao Cesto';
    botaoAdicionar.addEventListener('click', () => {
        adicionarAoCesto(produto);
    });
    const botaoAdicionarTodos = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar todos ao Cesto';
    botaoAdicionar.addEventListener('click', () => {
        adicionarAoCestoTodos(produto);
    });

    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(rating);
    artigo.appendChild(botaoAdicionar);

    return artigo;
}

// cria um elemento de produto na seção de produtos
function criarProdutoImagens(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price.toFixed(2)} €`;
    preco.classList.add('preco');

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('descricao');

    const rating = document.createElement('p');
    rating.classList.add('rating');
    rating.innerHTML = gerarEstrelas(produto.rating.rate, produto.rating.count);

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao Cesto';
    botaoAdicionar.addEventListener('click', () => {
        adicionarAoCesto(produto);
    });

    artigo.appendChild(titulo);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(rating);
    artigo.appendChild(botaoAdicionar);

    return artigo;
}
// gera estrelas com base no rating
function gerarEstrelas(rate, count) {
    let estrelas = '★'.repeat(Math.floor(rate));
    return `${rate} ${estrelas} (${count} avaliações)`;
}


// adiciona um produto ao cesto
function adicionarAoCesto(produto) {
    cesto.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
    atualizarCesto();
}

function adicionarAoCestoTodos(produto) {
    let  listaProdutos = 0;
    let  ProdutoAtual = 0;

    while(ProdutoAtual<=listaProdutos){
        cesto.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
    atualizarCesto();
    ProdutoAtual++;
    }
   
}

// atualiza a exibição do cesto
function atualizarCesto() {
    // Limpa a lista atual do cesto
    listaCesto.innerHTML = '';

    // Adiciona cada produto do cesto à lista
    cesto.forEach((produto, index) => {
        const artigoCesto = criarProdutoCesto(produto, index);
        listaCesto.appendChild(artigoCesto);
    });

    exibirCustoTotal();

    mensagemCompraP.textContent = '';
}

// cria um elemento de produto no cesto
function criarProdutoCesto(produto, index) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price.toFixed(2)} €`;
    preco.classList.add('preco');

    const rating = document.createElement('p');
    rating.classList.add('rating');
    if (produto.rating && typeof produto.rating.rate === 'number') {
        rating.innerHTML = gerarEstrelas(produto.rating.rate, produto.rating.count);
    } else {
        rating.textContent = 'Sem rating';
    }

    // Botão para remover do cesto
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '- Remover do Cesto';
    botaoRemover.classList.add('botao-remover');
    botaoRemover.addEventListener('click', () => {
        removerDoCesto(index);
    });

    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(rating);
    artigo.appendChild(botaoRemover);

    return artigo;
}

// remove um produto do cesto
function removerDoCesto(index) {
    cesto.splice(index, 1);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
    atualizarCesto();
}

// exibe o custo total sem descontos
function exibirCustoTotal() {
    const total = cesto.reduce((soma, produto) => soma + produto.price, 0);
    precoTotalElemento.textContent = `Custo total: ${total.toFixed(2)} €`;
}

// aplica filtros
function aplicarFiltros() {
    let produtosFiltrados = allProdutos;

    // Filtrar por categoria
    const categoriaSelecionada = filtroCategoria.value;
    if (categoriaSelecionada !== 'all') {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.category === categoriaSelecionada);
    }

    // Procurar por nome
    const termoBusca = procurarProduto.value.toString();
    if (termoBusca) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.value.toString().includes(termoBusca));
    }

    // Ordenar por rate
    const ordem = ordenarPreco.rating;
    if (ordem === 'crescente') {
        produtosFiltrados.sort((a, b) => a.rate - b.rate);
    } else if (ordem === 'decrescente') {
        produtosFiltrados.sort((a, b) => b.rate - a.rate);
    }


     // Botão para remover do cesto
     const botaoRemoverImagem = document.createElement('button');
     botaoRemoverImagem.textContent = '- Remover Imagens';
     botaoRemoverImagem.classList.add('botao-removerimagem');
     botaoRemoverImagem.addEventListener('click', () => {
         criarProdutoImagens(index);
         carregarProdutos(index);
     });

    
}

function comprar() {
    if (cesto.length === 0) {
        alert('Seu cesto está vazio!');
        return;
    }

    // Coleta os IDs dos produtos
    const productIds = cesto.map(produto => produto.id);

    // Verifica se o usuário é estudante
    const isEstudante = document.getElementById('desconto-estudante').checked;

    // Obtém o cupom de desconto
    const cupom = document.getElementById('cupao-desconto').value.trim();

    // Prepara o payload conforme a definição da API
    const payload = {
        products: productIds,
        student: isEstudante,
        coupon: cupom
    };
    const name =document.getElementById('por-nome');
    

    // Envia o POST para o endpoint /buy
    fetch('https://deisishop.pythonanywhere.com/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(async response => {
            let data;
            try {
                data = await response.json();
            } catch (e) {
                data = { error: 'Resposta inválida da API.' };
            }

            if (response.ok) {
                // Sucesso
                mostrarSucesso(data);
            } else {
                // Outros códigos de erro 
                mostrarErro(data.error || 'Ocorreu um erro inesperado.');
            }
        })
        .catch(error => {
            console.error('Erro ao finalizar a compra:', error);
            mostrarErro('Erro ao finalizar a compra.');
        });
}

// Exibe mensagem de sucesso
function mostrarSucesso(data) {
    const { totalCost, reference } = data;
    mensagemCompraP.innerHTML = `
        Valor final a pagar (com eventuais descontos): ${totalCost} €<br>
        Referência de Pagamento: ${reference}
        Message
    `;
}

// Exibe mensagem de erro
function mostrarErro(mensagem) {
    mensagemCompraP.textContent = `Erro: ${mensagem}`;
}

// Adiciona o evento ao botão de comprar
comprarBtn.addEventListener('click', comprar);
