import type { Statistic } from "../../domain/entities/Statistic";
import type { IStatisticsRepository } from "../../domain/repositories/IStatisticsRepository";

const MOCK_DATA: Statistic[] = [
  { id: "1", label: "Usuários", value: 100, type: "engajamento" },
  { id: "2", label: "Vendas", value: 50, type: "financeiro" },
];

export class StatisticsApiRepository implements IStatisticsRepository {
  async getAll(type?: string): Promise<Statistic[]> {
    // Simula filtro
    return type ? MOCK_DATA.filter((stat) => stat.type === type) : MOCK_DATA;
  }
}
