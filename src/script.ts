import { CountList } from "./countBy.js";
import Estatisticas from "./Estatisticas.js";
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
  preencherEstatisticas(transacoes);
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

function preencherLista(lista: CountList, elementId: string): void {
  const containerElement = document.getElementById(elementId);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const estatisticas = new Estatisticas(transacoes);

  const totalElement = document.querySelector<HTMLInputElement>("#total span");
  if (totalElement) {
    totalElement.innerText = estatisticas.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const diaElement = document.querySelector<HTMLInputElement>("#dia span");
  if (diaElement) {
    diaElement.innerText = estatisticas.melhorDia[0];
  }

  preencherLista(estatisticas.pagamentos, "pagamentos");
  preencherLista(estatisticas.status, "status");
}

handleData();
