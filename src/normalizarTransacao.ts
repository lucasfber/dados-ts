declare global {
  type TransacaoFormaPagamento = "Boleto" | "Cartão de Crédito";

  type TransacaoStatus =
    | "Paga"
    | "Aguardando pagamento"
    | "Recusada pela operadora de cartão";

  interface TransacaoAPI {
    Status: TransacaoStatus;
    ID: number;
    Data: string;
    ["Forma de Pagamento"]: TransacaoFormaPagamento;
    Email: string;
    ["Valor (R$)"]: string;
    ["Cliente Novo"]: number;
  }

  interface Transacao {
    status: TransacaoStatus;
    id: number;
    data: string;
    email: string;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoFormaPagamento;
    novo: boolean;
  }
}

export default function normalizarTransacao(transacao: TransacaoAPI) {
  return {
    status: transacao.Status,
    id: transacao.ID,
    data: transacao.Data,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: 0,
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
}
