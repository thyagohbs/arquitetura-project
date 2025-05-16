import React, { useEffect, useState } from 'react';
import type { Statistic } from '../../domain/entities/Statistic';
import { StatisticsApiRepository } from '../../infrastructure/api/StatisticApiRepository';
import { getStatisticsUseCase } from '../../domain/usecases/getStatisticsUseCase';
import { StatisticCard } from '../components/StatisticCard';
import { StatisticsChart } from '../components/StatisticsChart';

const types = [
    { label: 'Todos', value: '' },
    { label: 'Engajamento', value: 'engajamento' },
    { label: 'Financeiro', value: 'financeiro' },
];

export const DashboardPage: React.FC = () => {
    const [statistics, setStatistics] = useState<Statistic[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const repository = new StatisticsApiRepository();
        const fetchStatistics = getStatisticsUseCase(repository);

        setLoading(true);
        fetchStatistics(selectedType || undefined)
            .then(data => setStatistics(data))
            .finally(() => setLoading(false));
    }, [selectedType]);

    return (
        <div>
            <h2>Dashboard de Estatísticas</h2>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                {types.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                ))}
            </select>
            <StatisticsChart data={statistics} />
            <div style={{ display: 'flex', gap: 16 }}>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    statistics.map(stat => (
                        <StatisticCard key={stat.id} statistic={stat} />
                    ))
                )}
            </div>
        </div>
    );
};