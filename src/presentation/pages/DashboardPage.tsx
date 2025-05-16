import React, { useEffect, useState } from 'react';
import type { Statistic } from '../../domain/entities/Statistic';
import { StatisticsList } from '../components/StatisticsList';

// Interface de serviço para buscar estatísticas (DIP: abstração, não implementação concreta)
interface StatisticsService {
    getAll(): Promise<Statistic[]>;
}

// DashboardPage: componente de alto nível que orquestra a busca e exibição dos dados.
// DIP: recebe o serviço como prop, não depende de implementação concreta.
// SRP: só coordena busca e exibição, não implementa lógica de dados.
export const DashboardPage: React.FC<{ service: StatisticsService }> = ({ service }) => {
    const [statistics, setStatistics] = useState<Statistic[]>([]);

    // Recebe o service via props e busca os dados
    useEffect(() => {
        service.getAll().then(setStatistics);
    }, [service]);

    // ISP: só passa para StatisticsList o que ela realmente precisa (a lista)
    return <StatisticsList statistics={statistics} />;
};