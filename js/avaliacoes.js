const avaliacoes = document.querySelectorAll('.avaliacao');
const anterior = document.getElementById('avaliacao-anterior');
const proxima = document.getElementById('proxima-avaliacao');
let atual = 0;

for (let i = 1; i < avaliacoes.length; i++) {
    avaliacoes[i].classList.add('oculto');
}

function trocarAvaliacao(passo) {
    avaliacoes[atual].classList.add('oculto');
    atual = atual + passo;

    if (atual < 0) {
        atual = avaliacoes.length - 1;
    } else if (atual === avaliacoes.length) {
        atual = 0;
    }

    avaliacoes[atual].classList.remove('oculto');
}

anterior.addEventListener('click', function () {
    trocarAvaliacao(-1);
});

proxima.addEventListener('click', function () {
    trocarAvaliacao(1);
});
