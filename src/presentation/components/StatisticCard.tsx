import React from 'react';
import type { Statistic } from '../../domain/entities/Statistic';

// Agora o componente aceita a prop opcional renderFooter
export const StatisticCard: React.FC<{ statistic: Statistic; renderFooter?: () => React.ReactNode }> = ({ statistic, renderFooter }) => (
    <div>
        <h3>{statistic.label}</h3>
        <p>{statistic.value}</p>
        {/* Só renderiza o footer se for passado */}
        {renderFooter && <div>{renderFooter()}</div>}
    </div>
);