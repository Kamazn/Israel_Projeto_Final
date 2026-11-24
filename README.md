# UnipeBurguer

Projeto da disciplina de Desenvolvimento Front-End para Web. Fiz um site de hamburgueria com cardápio, cupons e uma simulação de pedido.

## Funcionalidades

- Ver os lanches, os combos, o milk-shake e seus ingredientes.
- Escolher um produto no cardápio e abrir o formulário com ele selecionado.
- Ver os cupons e digitar um código para calcular o desconto.
- Preencher o endereço, conferir o total e ver a confirmação do pedido.
- Ler as avaliações usando os botões de avançar e voltar.

## Como executar

1. Baixe e extraia a pasta do projeto.
2. Na pasta do projeto, execute `python -m http.server 8000` e abra `http://localhost:8000/` no navegador.
3. Entre no cardápio, escolha um produto e preencha o formulário em **Meu pedido**.

O site usa HTML, CSS e JavaScript, sem precisar de um processo de build. O pedido é uma simulação.

## Estrutura

    index.html  Página inicial
    html/   Demais páginas do site
    css/    Estilos das páginas
    js/     JavaScript do pedido e das avaliações
    img/    Logo e fotos dos produtos
    video/  Vídeo da página inicial

## Limitações conhecidas

- O pedido é simulado. Preencher o endereço e confirmar o pedido só exibe uma confirmação na tela.
- Os dados do pedido e o cupom digitado são perdidos ao recarregar a página.
- Os cupons servem para demonstrar o cálculo do desconto, e as avaliações são ilustrativas.

## O que mudou no site

- No [Cardápio](html/cardapio.html), o botão **Adicionar ao carrinho** agora adiciona o produto sem sair da página.
- No [Carrinho](html/carrinho.html), dá para mudar quantidades, remover itens e ver subtotal, desconto e total separados. Os itens ficam salvos no mesmo navegador pelo `localStorage`. O endereço e o cupom digitado continuam temporários.
- Na página de [Cupons](html/cupons.html), dá para copiar o código e colar no carrinho.
- Adicionei as páginas [Sobre nós](html/sobrenos.html) e [Contato](html/contato.html), com confirmação de envio simulado.

## Sobre os commits

Professor, eu comecei a fazer o projeto alguns dias antes, em outra pasta no meu computador. Eu infelizmente faltei à última aula e só soube hoje, quando meus colegas mfe avisaram, que precisava azer commits todos os dias. Por isso, o histórico do GitHub começa depois de parte do trabalho que fiz no computador. Peço desculpas por isso de verdade porque eles me falaram que o senhor tinha avisado bastante, e entendo perfeitamente se o senhor tirar alguns pontos por conta disso

![Pasta projeto_teste no Explorador de Arquivos](img/pasta-do-projeto.png)

João Gabriel Gonçalves Batista - 2026
