// Hook responsável por orquestrar a busca de estatísticas e expor para a UI
import { useEffect, useState } from "react";
import type { Statistic } from "../../domain/entities/Statistic";
import { getStatistics } from "../../domain/usecases/getStatistics";

export function useStatistics(type?: string) {
  // Hook para gerenciar o estado das estatísticas
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca as estatísticas ao montar o componente
    setLoading(true);
    getStatistics(type).then((data) => {
      setStatistics(data);
      setLoading(false);
    });
  }, [type]);

  return { statistics, loading };
}
