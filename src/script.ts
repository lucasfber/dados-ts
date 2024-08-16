import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";

async function handleData() {
  const data = await fetchData<TransacaoAPI>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (!data) return;

  // const transacoes = data.map(normalizarTransacao);
  const transacoes = data.map((item) => normalizarTransacao(item));
  console.log(transacoes);
}

handleData();
