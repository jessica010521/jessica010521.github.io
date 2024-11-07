// 1. Mensagem de agradecimento ao passar o mouse (usando arrow functions)
const hoverMessage = document.getElementById("hoverMessage");

hoverMessage.addEventListener("mouseenter", () => {
    hoverMessage.innerText = "1. Obrigada por passares";
});

hoverMessage.addEventListener("mouseleave", () => {
    hoverMessage.innerText = "1. Passa por aqui";
});

// 2. Mudança de cor da frase "Pinta-me"
document.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color; // Acessa a cor a partir do data-color
        document.getElementById("paintMe").style.color = color; // Aplica a cor ao texto "Pinta-me"
    });
});

// 3. Alteração de cor da caixa de texto enquanto digita (somente ao inserir algo)
const typeBox = document.getElementById("typeBox");
typeBox.addEventListener("input", () => {
    if (typeBox.value) {
        typeBox.style.backgroundColor = getRandomColor();
    } else {
        typeBox.style.backgroundColor = ""; // Remove a cor se a caixa estiver vazia
    }
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 4. Alteração do fundo com base na seleção do dropdown
function changeBackgroundColor(selectElement) {
    document.body.style.backgroundColor = selectElement.value; // Usa o valor selecionado
}

// 5. Contador que incrementa ao clicar
let count = 0;
function incrementCount() {
    count++;
    document.getElementById("countDisplay").innerText = count;
}

// 6. Exibir mensagem com nome e idade
function displayGreeting() {
    const name = document.getElementById("nameInput").value;
    const age = document.getElementById("ageInput").value;
    const greetingMessage = document.getElementById("greetingMessage");
    
    if (name && age) {
        greetingMessage.innerText = `6. Olá, ${name}, você tem ${age} anos!`;
    } else {
        greetingMessage.innerText = "6. Por favor, insira o seu nome e idade.";
    }
}

// 7. Contador automático
let autoCount = 0;
function startAutoCounter() {
    setInterval(() => {
        autoCount++;
        document.getElementById("autoCounter").innerText = autoCount;
    }, 1000); // Intervalo de 1 segundo para o contador automático
}

// Iniciar o contador automático ao carregar a página
window.onload = startAutoCounter;
