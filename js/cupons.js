const botoesCopiar = document.querySelectorAll('.copiar-cupom');

for (const botao of botoesCopiar) {
    botao.addEventListener('click', async function () {
        const cartao = botao.closest('.cupom');
        const campo = cartao.querySelector('input');
        const retorno = cartao.querySelector('.retorno-cupom');

        try {
            await navigator.clipboard.writeText(campo.value);
            retorno.textContent = 'Código copiado!';
        } catch {
            campo.focus();
            campo.select();
            retorno.textContent = 'Código selecionado. Use a opção de copiar.';
        }
    });
}
