import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader';

// Página inicial do dashboard
// Responsável por compor a interface principal do dashboard
export const DashboardHome: React.FC = () => (
    <div>
        {/* Cabeçalho do dashboard */}
        <DashboardHeader
            title="Dashboard de Estatísticas"
            subtitle="Visualize métricas e gráficos em tempo real"
        />
        {/* Outros componentes e seções virão aqui */}
    </div>
);