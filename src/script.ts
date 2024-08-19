import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";

async function handleData() {
  const data = await fetchData<TransacaoAPI>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;

  const transacoes = data.map(normalizarTransacao);
  console.log(transacoes);
  preencherTabela(transacoes);
}

function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector("#tabela tbody");
  console.log(tabela);

  if (!tabela) return;

  transacoes.forEach((item) => {
    tabela.innerHTML += `
      <tr>
        <td>${item.email}</td>
        <td>${item.valor ? "R$ " + item.moeda : "-"}</td>
        <td>${item.pagamento}</td>
        <td>${item.status}</td>
      </tr>
    `;
  });
}

handleData();
