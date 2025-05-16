import { useEffect, useState } from "react";
import type { Statistic } from "../../domain/entities/Statistic";

export function useStatistics(service: { getAll: () => Promise<Statistic[]> }) {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    service.getAll().then((data) => {
      setStatistics(data);
      setLoading(false);
    });
  }, [service]);

  return { statistics, loading };
}
