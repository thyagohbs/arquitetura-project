import React from 'react';
import type { Statistic } from '../../domain/entities/Statistic';
import { StatisticCard } from './StatisticCard';

// ColoredStatisticCard: exemplo de substituição (LSP) e extensão (OCP).
// Pode ser usado no lugar do StatisticCard, adicionando um rodapé customizado.
export const ColoredStatisticCard: React.FC<{ statistic: Statistic }> = ({ statistic }) => (
    <StatisticCard
        statistic={statistic}
        renderFooter={() => (
            <span style={{ color: 'blue' }}>Extra</span>
        )}
    />
);