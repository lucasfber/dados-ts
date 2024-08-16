/**
 * Recebe string 1.250,00 retorna number: 1250.00
 */
export default function moedaParaNumero(valor: string): number | null {
  const value = Number(valor.replaceAll(".", "").replaceAll(",", "."));
  return isNaN(value) ? null : value;
}
