// Contador Automático
let counter = 0;
const autoCounterElement = document.getElementById('autoCounter');
setInterval(() => {
    counter++;
    autoCounterElement.textContent = counter;
}, 1000);

// "Passa por aqui!" - Hover Event
const hoverArea = document.getElementById('hoverArea');
hoverArea.addEventListener('mouseover', () => {
    hoverArea.textContent = 'Foge, há um gato!';
});
hoverArea.addEventListener('mouseout', () => {
    hoverArea.textContent = 'Move o rato aqui!';
});

// "Experimenta escrever..."
const typeBox = document.getElementById('typeBox');
const typeResult = document.getElementById('typeResult');
typeBox.addEventListener('input', () => {
    typeResult.textContent = `Escreveste: ${typeBox.value}`;
});

// Alteração de Cor com querySelectorAll e data-color
document.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color; // Aceder ao valor de data-color
        const paintMe = document.getElementById("paintMe");
        paintMe.style.backgroundColor = color;
    });
});


// Alteração do Background com dropdown (select)
const changeBackgroundColor = (select) => {
    const colorMap = {
        rosa: "#f7d8e3", // Cor rosa
        azul: "#add8e6", // Cor azul
        lavanda: "#e6e6fa"  // Cor lavanda
    };

    const color = select.value; // Obter o valor selecionado
    document.body.style.backgroundColor = colorMap[color] || ""; // Alterar fundo ou resetar
};


// Incremento do Contador com LocalStorage
let count = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;
document.getElementById('countDisplay').textContent = count;

const incrementCount = () => {
    count++;
    document.getElementById('countDisplay').textContent = count;
    localStorage.setItem('counter', count); // Atualiza o LocalStorage com o novo valor
};


// Formulário - Handle Submit com onsubmit
const handleFormSubmit = (event) => {
    event.preventDefault(); // Previne a submissão padrão
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const result = `Olá, ${name}! Tens ${age} anos.`;
    document.getElementById('formResult').textContent = result;
};

