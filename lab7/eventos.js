// Eventos relacionados com o rato
const mouseArea = document.getElementById('mouse-area');

mouseArea.addEventListener('click', () => {
    mouseArea.textContent = 'Clicaste aqui!';
});

mouseArea.addEventListener('dblclick', () => {
    mouseArea.textContent = 'Clicaste duas vezes!';
});

mouseArea.addEventListener('mouseover', () => {
    mouseArea.style.backgroundColor = 'lightblue';
});

mouseArea.addEventListener('mouseout', () => {
    mouseArea.style.backgroundColor = '';
});

mouseArea.addEventListener('mousemove', (event) => {
    mouseArea.textContent = `X: ${event.offsetX}, Y: ${event.offsetY}`;
});

// Eventos relacionados com o teclado
const inputTeclado = document.getElementById('input-teclado');
const tecladoOutput = document.getElementById('teclado-output');

inputTeclado.addEventListener('keydown', (event) => {
    tecladoOutput.textContent = `A tecla pressionada foi: ${event.key}`;
});

inputTeclado.addEventListener('keyup', () => {
    tecladoOutput.textContent = 'Soltaste uma tecla!';
});

const mensagemInterativa = document.createElement('p');
mensagemInterativa.id = 'mensagem-interativa';
mensagemInterativa.textContent = 'Clica no botão abaixo para uma mensagem surpresa!';
document.body.appendChild(mensagemInterativa);

const botaoInterativo = document.createElement('button');
botaoInterativo.textContent = 'Mostrar Mensagem';
document.body.appendChild(botaoInterativo);

botaoInterativo.addEventListener('click', () => {
    mensagemInterativa.textContent = 'Olá! Obrigado por interagir!';
    mensagemInterativa.style.color = 'blue';
    mensagemInterativa.style.fontSize = '20px';
    mensagemInterativa.style.fontWeight = 'bold';
});

