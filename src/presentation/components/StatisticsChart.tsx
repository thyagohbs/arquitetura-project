import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Statistic } from '../../domain/entities/Statistic';

// Componente de apresentação: só recebe dados prontos para exibir
type Props = {
    data: Statistic[];
};

export const StatisticsChart: React.FC<Props> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);