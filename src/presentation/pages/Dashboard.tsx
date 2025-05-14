// Página principal do dashboard: consome o hook e exibe os cards
import React, { useState } from 'react';
import { useStatistics } from '../../application/hooks/useStatistics';
import { StatisticCard } from '../components/StatisticCard';

const types = [
    { label: 'Todos', value: '' },
    { label: 'Usuários', value: 'user' },
    { label: 'Vendas', value: 'sales' },
    { label: 'Leads', value: 'lead' },
];

export const Dashboard: React.FC = () => {
    const [selectedType, setSelectedType] = useState('');
    const { statistics, loading } = useStatistics(selectedType);

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h2>Dashboard de Estatísticas</h2>
            <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                style={{ marginBottom: 16 }}
            >
                {types.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                ))}
            </select>
            <div style={{ display: 'flex', gap: 16 }}>
                {statistics.map((stat) => (
                    <StatisticCard key={stat.id} statistic={stat} />
                ))}
            </div>
        </div>
    );
};