import type { IStatisticsRepository } from "../../domain/repositories/IStatisticsRepository";

// O caso de uso depende apenas da interface, não da implementação concreta
// Correto: recebe o repositório e retorna uma função que aceita o filtro
export function getStatisticsUseCase(repository: IStatisticsRepository) {
  return async (type?: string) => repository.getAll(type);
}
