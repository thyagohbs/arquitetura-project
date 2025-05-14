// Componente de apresentação: exibe uma estatística na tela
import React from 'react';
import type { Statistic } from '../../domain/entities/Statistic';

type Props = {
    statistic: Statistic;
};

export const StatisticCard: React.FC<Props> = ({ statistic }) => (
    <div>
        <h3>{statistic.label}</h3>
        <p>{statistic.value}</p>
    </div>
);