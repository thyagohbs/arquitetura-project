import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { StatisticCard } from './StatisticCard';

describe('StatisticCard', () => {
  it('exibe label e valor corretamente', () => {
    render(
      <StatisticCard statistic={{ id: '1', label: 'Testes', value: 42 }} />
    );
    expect(screen.getByText('Testes')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
