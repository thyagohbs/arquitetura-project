import type { Statistic } from "../entities/Statistic";

// Define o contrato para qualquer fonte de dados de estatísticas
export interface IStatisticsRepository {
  getAll(type?: string): Promise<Statistic[]>;
}
