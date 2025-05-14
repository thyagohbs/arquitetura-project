// Serviço de infraestrutura: responsável por buscar estatísticas de uma API real
import type { Statistic } from "../domain/entities/Statistic";

export async function fetchStatisticsFromApi(): Promise<Statistic[]> {
  // Exemplo de chamada real (aqui é só um mock)
  // return fetch('/api/statistics').then(res => res.json());
  return [
    { id: "1", label: "Usuários", value: 120 },
    { id: "2", label: "Vendas", value: 87 },
  ];
}
