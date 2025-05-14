// Caso de uso: obtém estatísticas (pode ser de uma API, mock, etc)
import type { Statistic } from "../entities/Statistic";

export async function getStatistics(type?: string): Promise<Statistic[]> {
  // Simula busca de dados
  const allStats = [
    { id: "1", label: "Usuários", value: 120, type: "user" },
    { id: "2", label: "Vendas", value: 87, type: "sales" },
    { id: "3", label: "Novos Leads", value: 30, type: "lead" },
  ];
  // Filtra se o tipo for informado
  return type ? allStats.filter((stat) => stat.type === type) : allStats;
}
