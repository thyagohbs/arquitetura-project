import React from 'react';

// Componente de cabeçalho do dashboard
// Responsável apenas pela apresentação (UI), sem lógica de negócio
type DashboardHeaderProps = {
    title: string;      // Título principal do dashboard
    subtitle?: string;  // Subtítulo opcional
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => (
    <header>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
    </header>
);