import fetchData from "./fetchData.js";

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

async function handleData() {
  const data = await fetchData<TransacaoAPI>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (data)
    data.forEach((item) => {
      console.log(item["Valor (R$)"]);
    });

  //console.log("Codigo continua");
}

handleData();
