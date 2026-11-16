const formulario = document.getElementById('formulario-contato');
const janela = document.getElementById('mensagem-enviada');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    formulario.reset();
    janela.showModal();
});
