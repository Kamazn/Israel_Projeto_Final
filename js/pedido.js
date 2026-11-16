const formulario = document.getElementById('formulario-pedido');
const campoLanche = document.getElementById('hamburguer');
const campoQuantidade = document.getElementById('quantidade');
const campoMilkshake = document.getElementById('milkshake');
const campoCupom = document.getElementById('cupom');
const campoNome = document.getElementById('nome');
const total = document.getElementById('total');
const mensagemCupom = document.getElementById('mensagem-pedido');
const confirmacao = document.getElementById('confirmacao-pedido');
const caixa = document.getElementById('pedido-concluido');
const resumoConfirmacao = document.getElementById('resumo-confirmacao');

const linkDoProduto = location.hash;
const opcoes = formulario.querySelectorAll('option[id]');

for (const opcao of opcoes) {
    if (linkDoProduto === '#' + opcao.id) {
        opcao.selected = true;
    }
}

if (linkDoProduto === '#milkshake-16') {
    campoLanche.value = '0';
}

function calcularDesconto(subtotal) {
    const codigo = campoCupom.value.trim().toUpperCase();
    let porcentagem = 0;
    mensagemCupom.textContent = '';

    if (codigo === '') {
        return 0;
    }

    if (codigo === 'UNIPE10') {
        porcentagem = 10;
    } else if (codigo === 'UNIPE20') {
        porcentagem = 20;
    } else if (codigo === 'UNIPE30') {
        porcentagem = 30;
    } else {
        mensagemCupom.textContent = 'Cupom inválido.';
        return 0;
    }

    mensagemCupom.textContent = 'Cupom aplicado: ' + porcentagem + '% de desconto.';
    return subtotal * porcentagem / 100;
}

function calcularTotal() {
    const precoLanche = Number(campoLanche.value);
    const quantidade = Number(campoQuantidade.value);
    const precoMilkshake = Number(campoMilkshake.value);
    const subtotal = precoLanche * quantidade + precoMilkshake;
    const desconto = calcularDesconto(subtotal);
    const valorFinal = subtotal - desconto;

    total.textContent = valorFinal.toFixed(2).replace('.', ',');
    confirmacao.textContent = '';
}

function conferirPedido(evento) {
    evento.preventDefault();
    const nome = campoNome.value.trim();

    if (nome === '') {
        confirmacao.textContent = 'Digite seu nome para conferir.';
        campoNome.focus();
        return;
    }

    if (campoLanche.value === '0' && campoMilkshake.value === '0') {
        confirmacao.textContent = 'Escolha um item do cardápio.';
        return;
    }

    calcularTotal();
    resumoConfirmacao.textContent = nome + ', seu pedido foi concluído. Total: R$ ' + total.textContent + '.';
    caixa.showModal();
}

formulario.addEventListener('change', calcularTotal);
campoCupom.addEventListener('input', calcularTotal);
formulario.addEventListener('submit', conferirPedido);
calcularTotal();
