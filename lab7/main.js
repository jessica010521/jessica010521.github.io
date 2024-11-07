// 1. Mensagem de agradecimento ao passar o mouse
const hoverMessage = document.getElementById("hoverMessage");
hoverMessage.addEventListener("mouseenter", () => {
    hoverMessage.innerText = "Obrigada por passares";
});
hoverMessage.addEventListener("mouseleave", () => {
    hoverMessage.innerText = "Passa por aqui";
});

// 2. Mudança de cor da frase "Pinta-me"
function changeColor(color) {
    const paintMe = document.getElementById("paintMe");
    paintMe.style.color = color;
}

// 3. Alteração de cor da caixa de texto enquanto digita
const typeBox = document.getElementById("typeBox");
typeBox.addEventListener("input", () => {
    typeBox.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 4. Alteração do fundo com base na cor escrita
function changeBackgroundColor() {
    const colorInput = document.getElementById("colorInput").value;
    document.body.style.backgroundColor = colorInput;
}

// 5. Contador que incrementa ao clicar
let count = 0;
function incrementCount() {
    count++;
    document.getElementById("countDisplay").innerText = count;
}
