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
  semana;
  melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.valor = this.setValor();
    this.pagamentos = this.setPagamentos();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
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

  private setSemana() {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    };

    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();
      if (day === 0) semana["Domingo"] += 1;
      if (day === 1) semana["Segunda"] += 1;
      if (day === 2) semana["Terça"] += 1;
      if (day === 3) semana["Quarta"] += 1;
      if (day === 4) semana["Quinta"] += 1;
      if (day === 5) semana["Sexta"] += 1;
      if (day === 6) semana["Sábado"] += 1;
    }

    return semana;
  }

  private setMelhorDia() {
    const dias = Object.entries(this.semana);
    dias.sort((a, b) => b[1] - a[1]);
    return dias[0];
  }
}
