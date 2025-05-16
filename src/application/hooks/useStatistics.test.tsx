import { renderHook, act } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import { useStatistics } from './useStatistics';

describe('useStatistics', () => {
  it('deve buscar e retornar estatísticas', async () => {
    const mockService = {
      getAll: vi.fn().mockResolvedValue([
        { id: '1', label: 'Usuários', value: 100 },
        { id: '2', label: 'Vendas', value: 50 },
      ]),
    };

    const { result } = renderHook(() => useStatistics(mockService));

    await act(async () => { });

    expect(result.current.statistics).toHaveLength(2);
    expect(result.current.statistics[0].label).toBe('Usuários');
    expect(result.current.loading).toBe(false);
  });
});
