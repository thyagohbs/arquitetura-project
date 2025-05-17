# Ciclo Final: Clean Architecture, SOLID e Entrega Contínua

---

## Como aplico SRP (Single Responsibility Principle) no layout do projeto

No meu projeto, aplico o **SRP** garantindo que cada componente, arquivo e camada tenha uma única responsabilidade:

- **Componentes de UI** (ex: `StatisticCard`, `StatisticsList`) servem apenas para exibir dados, sem lógica de negócio ou acesso a dados.
- **Páginas** (ex: `DashboardPage`) apenas orquestram a montagem da tela, delegando a busca de dados para hooks ou serviços.
- **Hooks** (ex: `useStatistics`) cuidam apenas da lógica de obtenção e gerenciamento de estado dos dados.
- **Serviços e casos de uso** (ex: `getStatisticsUseCase`) encapsulam a lógica de negócio e orquestram o fluxo entre domínio e infraestrutura.

**Exemplo prático:**

```typescript
// StatisticCard.tsx - só exibe dados
export const StatisticCard: React.FC<{ statistic: Statistic }> = ({
  statistic,
}) => (
  <div>
    <h3>{statistic.label}</h3>
    <p>{statistic.value}</p>
  </div>
);
```

Se eu precisar mudar a forma de exibir, altero só o componente. Se mudar a lógica de busca, altero só o hook ou serviço.

---

## Como aplico DIP (Dependency Inversion Principle) com services

Eu aplico o **DIP** ao garantir que componentes e hooks de alto nível dependam de **abstrações** (interfaces ou contratos), e não de implementações concretas.

- O componente `DashboardPage` recebe um serviço via prop, que implementa um contrato (ex: `StatisticsService`).
- O caso de uso (`getStatisticsUseCase`) depende de uma interface (`IStatisticsRepository`), não de uma classe concreta.
- A infraestrutura (ex: `StatisticsApiRepository`) implementa o contrato e pode ser trocada facilmente por mocks em testes ou por outra fonte de dados.

**Exemplo prático:**

```typescript
// Interface de serviço
interface StatisticsService {
  getAll(): Promise<Statistic[]>;
}

// DashboardPage recebe o serviço como prop
export const DashboardPage: React.FC<{ service: StatisticsService }> = ({
  service,
}) => {
  // ...
};
```

Assim, minha UI nunca depende diretamente de detalhes de infraestrutura.

---

## Passos que realizei para aplicar CI/CD

### 1. **Configuração de Scripts**

- Configurei scripts no `package.json` para build, testes e lint:
  - `npm run build`
  - `npm test`
  - `npm run lint`

### 2. **Integração Contínua (CI)**

- Configurei um workflow no GitHub Actions (`.github/workflows/ci.yml`):
  - Instala dependências
  - Roda lint
  - Executa build de produção
  - Executa todos os testes automatizados
- O CI garante que todo commit ou pull request só é aceito se passar por todos os testes e validações.

**Exemplo de workflow:**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

### 3. **Entrega Contínua (CD)**

- O build gerado (`dist/`) pode ser publicado automaticamente em plataformas como Vercel, Netlify ou GitHub Pages.
- O deploy pode ser acionado automaticamente após o sucesso do CI, garantindo que apenas código validado chegue à produção.

---

## Resumo

- **SRP**: Eu garanto que cada parte do sistema tem uma responsabilidade única e clara.
- **DIP**: Faço com que componentes e lógica de negócio dependam de contratos, não de implementações concretas.
- **CI/CD**: O projeto é testado, validado e entregue automaticamente, garantindo qualidade e agilidade.

**Meu papel agora:**  
Manter a disciplina nesses princípios em cada nova feature, refatoração ou entrega.  
Serei penalizado se negligenciar a separação de responsabilidades, inversão de dependência ou automação de build/teste/deploy.

---
