import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatisticCard } from "./StatisticCard";

describe("StatisticCard", () => {
  it("deve exibir o label e o valor da estatística", () => {
    render(
      <StatisticCard statistic={{ id: "1", label: "Testes", value: 42 }} />
    );
    expect(screen.getByText("Testes")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
