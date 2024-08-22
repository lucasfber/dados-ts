import countBy from "./countBy.js";

type TransacaoComValor = Transacao & { valor: number };

function filtrarValor(transacao: Transacao): transacao is TransacaoComValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  valor;
  pagamentos;
  status;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.valor = this.setValor();
    this.pagamentos = this.setPagamentos();
    this.status = this.setStatus();
  }

  private setValor() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return item.valor + acc;
    }, 0);
  }

  private setPagamentos() {
    return countBy(this.transacoes.map((item) => item.pagamento));
  }

  private setStatus() {
    return countBy(this.transacoes.map((item) => item.status));
  }
}
