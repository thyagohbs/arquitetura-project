import { renderHook, act } from "@testing-library/react";
import { useStatistics } from "./useStatistics";

// Mock do caso de uso
jest.mock("../useCases/getStatistics", () => ({
  getStatistics: () =>
    Promise.resolve([
      { id: "1", label: "Usuários", value: 100 },
      { id: "2", label: "Vendas", value: 50 },
    ]),
}));

describe("useStatistics", () => {
  it("deve buscar e retornar estatísticas", async () => {
    const { result } = renderHook(() => useStatistics());

    // Aguarda o useEffect rodar
    await act(async () => {});

    expect(result.current.statistics).toHaveLength(2);
    expect(result.current.statistics[0].label).toBe("Usuários");
    expect(result.current.loading).toBe(false);
  });
});
