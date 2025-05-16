import React from 'react';
import type { Statistic } from '../../domain/entities/Statistic';
import { StatisticCard } from './StatisticCard';

// StatisticsList: componente responsável apenas por renderizar uma lista de StatisticCard.
// SRP: não busca dados, não formata, só exibe a lista recebida.
export const StatisticsList: React.FC<{ statistics: Statistic[] }> = ({ statistics }) => (
    <div style={{ display: 'flex', gap: 16 }}>
        {/* LSP: StatisticCard pode ser substituído por outro card compatível sem quebrar a lista */}
        {statistics.map(stat => (
            <StatisticCard key={stat.id} statistic={stat} />
        ))}
    </div>
);