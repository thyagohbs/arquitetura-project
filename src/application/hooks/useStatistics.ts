// Hook responsável por orquestrar a busca de estatísticas e expor para a UI
import { useEffect, useState } from "react";
import type { Statistic } from "../../domain/entities/Statistic";
import { getStatisticsUseCase } from "../../domain/usecases/getStatisticsUseCase";
import { StatisticsApiRepository } from "../../infrastructure/api/StatisticApiRepository";
export function useStatistics(type?: string) {
  // Hook para gerenciar o estado das estatísticas
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca as estatísticas ao montar o componente
    setLoading(true);
    const repository = new StatisticsApiRepository();
    const fetchStatistics = getStatisticsUseCase(repository); // Aqui você passa o repositório

    // Depois, passa o filtro (string ou undefined) para a função retornada
    fetchStatistics(type || undefined).then((data: Statistic[]) => {
      setStatistics(data);
      setLoading(false);
    });
  }, [type]);

  return { statistics, loading };
}
