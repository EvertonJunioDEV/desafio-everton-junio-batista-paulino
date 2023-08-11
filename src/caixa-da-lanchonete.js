class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const formasDePagamento = ["dinheiro", "credito", "debito"];
    const acrescimo = 1+3 / 100; //acrescimo de 3%
    const desconto = 1-5 / 100; //desconto de 5%

    const cardapio = {
      cafe: 3.0,
      chantily: 1.5, //extra
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0, //extra
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    if (itens.length === 0 || itens[0] === "") {
      return "Não há itens no carrinho de compra!";
    }

    if (!formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const valorPedidos = itens.map((item) => {
      const [itemNoCardapio, quantiaDoPedido] = item.split(",");

      if (!cardapio[itemNoCardapio]) {
        return "Item inválido!";
      }

      if (!quantiaDoPedido || isNaN(quantiaDoPedido) || Number(quantiaDoPedido) < 1) 
      {
        return "Quantidade inválida!";
      }
      
      if (
        (itens.some((item) => item.includes("queijo")) &&
          !itens.some((item) => item.includes("sanduiche"))) ||
        (itens.some((item) => item.includes("chantily")) &&
          !itens.some((item) => item.includes("cafe")))
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }

      const pedido = cardapio[itemNoCardapio] * Number(quantiaDoPedido);

      return pedido;
    });
    //caso seja o erro: Item extra não pode ser pedido sem o principal
    if (typeof valorPedidos[0] === "string") {
      return valorPedidos[0];
    }

    //caso contrario, calculando descontos e imprimindo com base na forma de pagamento

    const totalComanda = valorPedidos.reduce((acumulador, atual) => {
      return (acumulador += atual);
    }, 0);

    if (metodoDePagamento === "dinheiro") {
      return `R$ ${(totalComanda * desconto).toFixed(2).replace(".", ",")}`;
    }
    if (metodoDePagamento === "debito") {
      return `R$ ${totalComanda.toFixed(2).replace(".", ",")}`;
    }
    if (metodoDePagamento === "credito") {
      return `R$ ${(totalComanda * acrescimo).toFixed(2).replace(".", ",")}`;
    }
  }
}

export { CaixaDaLanchonete };
