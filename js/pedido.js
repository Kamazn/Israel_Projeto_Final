const chaveCarrinho = 'unipeburguer-carrinho';
const botoesAdicionar = document.querySelectorAll('.adicionar-produto');
const lista = document.getElementById('itens-carrinho');
const modelo = document.getElementById('modelo-produto');
const avisoVazio = document.getElementById('carrinho-vazio');
const voltarCardapio = document.querySelector('.voltar-cardapio');

const fotosAntigas = {
    'hamburguer-22': '../img/hamburguer1.png',
    'hamburguer-26': '../img/hamburguer2.png',
    'hamburguer-36': '../img/combo1.png',
    'hamburguer-39': '../img/combo2.png',
    'hamburguer-34': '../img/combo3.png',
    'milkshake-16': '../img/milkshake.png'
};

function lerCarrinho() {
    const dados = localStorage.getItem(chaveCarrinho);
    return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(itens) {
    localStorage.setItem(chaveCarrinho, JSON.stringify(itens));
}

function adicionarProduto(botao) {
    const itens = lerCarrinho();
    const produto = botao.closest('.produto');
    const foto = produto.querySelector('img').getAttribute('src');
    let encontrado = false;

    for (const item of itens) {
        if (item.codigo === botao.dataset.codigo) {
            item.quantidade++;
            item.foto = foto;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        itens.push({
            codigo: botao.dataset.codigo,
            nome: produto.querySelector('h3').textContent.trim(),
            foto: foto,
            preco: Number(botao.dataset.preco),
            quantidade: 1
        });
    }

    salvarCarrinho(itens);
    botao.parentElement.nextElementSibling.textContent = 'Adicionado ao carrinho.';
}

for (const botao of botoesAdicionar) {
    botao.addEventListener('click', function () {
        adicionarProduto(botao);
    });
}

function moeda(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function atualizarResumo(itens) {
    let subtotal = 0;

    for (const item of itens) {
        subtotal += item.preco * item.quantidade;
    }

    const codigo = campoCupom.value.trim().toUpperCase();
    let porcentagem = 0;

    if (codigo === 'UNIPE10') {
        porcentagem = 10;
    } else if (codigo === 'UNIPE20') {
        porcentagem = 20;
    } else if (codigo === 'UNIPE30') {
        porcentagem = 30;
    }

    mensagemCupom.textContent = '';
    if (codigo && porcentagem === 0) {
        mensagemCupom.textContent = 'Cupom inválido.';
    } else if (porcentagem > 0 && itens.length > 0) {
        mensagemCupom.textContent = 'Cupom aplicado.';
    }

    const desconto = subtotal * porcentagem / 100;
    document.getElementById('subtotal').textContent = moeda(subtotal);
    document.getElementById('desconto').textContent = moeda(desconto);
    document.getElementById('total').textContent = moeda(subtotal - desconto);
}

function alterarQuantidade(codigo, mudanca) {
    const itens = lerCarrinho();

    for (let i = 0; i < itens.length; i++) {
        if (itens[i].codigo === codigo) {
            itens[i].quantidade += mudanca;
            if (itens[i].quantidade <= 0) {
                itens.splice(i, 1);
            }
            break;
        }
    }

    salvarCarrinho(itens);
    mostrarCarrinho();
}

function criarCartao(item) {
    const cartao = modelo.content.firstElementChild.cloneNode(true);

    cartao.querySelector('img').src = item.foto || fotosAntigas[item.codigo] || '../img/logo.png';
    cartao.querySelector('h3').textContent = item.nome;
    cartao.querySelector('p').textContent = moeda(item.preco * item.quantidade);
    cartao.querySelector('span').textContent = item.quantidade;

    for (const botao of cartao.querySelectorAll('button')) {
        const acao = botao.dataset.acao;
        botao.id = item.codigo + '-' + acao;
        botao.setAttribute('aria-label', botao.getAttribute('aria-label') + ' ' + item.nome);

        botao.addEventListener('click', function () {
            let mudanca = 1;
            if (acao === 'diminuir') {
                mudanca = -1;
            } else if (acao === 'remover') {
                mudanca = -item.quantidade;
            }

            alterarQuantidade(item.codigo, mudanca);
            const foco = document.getElementById(botao.id) || voltarCardapio;
            foco.focus({ preventScroll: true });
        });
    }

    return cartao;
}

function mostrarCarrinho() {
    const itens = lerCarrinho();
    lista.textContent = '';
    avisoVazio.hidden = itens.length > 0;
    finalizar.disabled = itens.length === 0;

    for (const item of itens) {
        lista.appendChild(criarCartao(item));
    }

    atualizarResumo(itens);
}

const campoCupom = document.getElementById('cupom');
const mensagemCupom = document.getElementById('mensagem-pedido');
const finalizar = document.getElementById('finalizar-pedido');
const entrega = document.getElementById('formulario-entrega');

if (lista) {
    campoCupom.addEventListener('input', function () {
        atualizarResumo(lerCarrinho());
    });

    entrega.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const itens = lerCarrinho();
        if (itens.length === 0) {
            mostrarCarrinho();
            return;
        }

        atualizarResumo(itens);
        const total = document.getElementById('total').textContent;
        document.getElementById('resumo-confirmacao').textContent = 'Seu pedido foi feito! O total ficou em ' + total + '.';
        document.getElementById('pedido-concluido').showModal();
        entrega.reset();
        campoCupom.value = '';
        salvarCarrinho([]);
        mostrarCarrinho();
    });

    mostrarCarrinho();
    window.addEventListener('storage', mostrarCarrinho);
}
