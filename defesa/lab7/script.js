document.addEventListener("DOMContentLoaded", () => {
    let jogadorAtual = "X";
    let fimDeJogo = false;
    let nomeJogadorX = "Jogador X";
    let nomeJogadorO = "Jogador O";

    const casas = document.querySelectorAll(".casa");
    const mensagem = document.getElementById("mensagem");
    const botaoReiniciar = document.getElementById("reiniciar");
    const botaoIniciarJogo = document.getElementById("iniciar-jogo");
    const tabuleiro = document.getElementById("tabuleiro");
    const controle = document.getElementById("controle");
    const seletorCorCasas = document.getElementById("cor-casas");

    // Evento para iniciar o jogo com os nomes dos jogadores
    botaoIniciarJogo.addEventListener("click", () => {
        const inputJogadorX = document.getElementById("jogadorX").value;
        const inputJogadorO = document.getElementById("jogadorO").value;

        // Captura os nomes inseridos e define o valor padrão caso estejam vazios
        nomeJogadorX = inputJogadorX || "Jogador X";
        nomeJogadorO = inputJogadorO || "Jogador O";
        
        // Muda a cor das casas para a cor selecionada
        casas.forEach(casa => {
            casa.style.backgroundColor = seletorCorCasas.value;
        });

        // Esconde a área de entrada de nomes e exibe o tabuleiro e controles
        document.getElementById("nome-jogadores").style.display = "none";
        tabuleiro.style.display = "grid";
        controle.style.display = "block";
        
        mensagem.innerText = `Vez do ${nomeJogadorX}`;
    });

    // Adiciona eventos de clique nas casas
    casas.forEach(casa => {
        casa.addEventListener("click", () => jogar(casa));
    });

    // Adiciona evento de clique no botão de reiniciar
    botaoReiniciar.addEventListener("click", reiniciarJogo);

    function jogar(casa) {
        if (casa.innerText === "" && !fimDeJogo) {
            casa.innerText = jogadorAtual;
            if (checarVencedor()) {
                const vencedor = jogadorAtual === "X" ? nomeJogadorX : nomeJogadorO;
                mensagem.innerText = `${vencedor} venceu!`;
                alert(`${vencedor} venceu!`); // Exibe o alert com o vencedor
                fimDeJogo = true;
            } else if (empate()) {
                mensagem.innerText = "Empate!";
                fimDeJogo = true;
            } else {
                jogadorAtual = jogadorAtual === "X" ? "O" : "X";
                const proximoJogador = jogadorAtual === "X" ? nomeJogadorX : nomeJogadorO;
                mensagem.innerText = `Vez do ${proximoJogador}`;
            }
        }
    }

    function checarVencedor() {
        const combinacoes = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return combinacoes.some(combinacao => {
            const [a, b, c] = combinacao;
            return casas[a].innerText === jogadorAtual &&
                   casas[a].innerText === casas[b].innerText &&
                   casas[a].innerText === casas[c].innerText;
        });
    }

    function empate() {
        return [...casas].every(casa => casa.innerText !== "");
    }

    function reiniciarJogo() {
        // Reseta o conteúdo das casas e o estado do jogo
        casas.forEach(casa => {
            casa.innerText = "";
            casa.style.backgroundColor = "#ffffff"; // Restaura a cor padrão das casas
        });
        jogadorAtual = "X";
        fimDeJogo = false;

        // Mostra a área de entrada de nomes e esconde o tabuleiro e controles
        document.getElementById("nome-jogadores").style.display = "block";
        tabuleiro.style.display = "none";
        controle.style.display = "none";

        // Limpa o campo de mensagem
        mensagem.innerText = "";
    }
});
