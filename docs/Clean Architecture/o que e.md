# Clean Architecture no Meu Projeto de Dashboard

## Como Entendo os Conceitos Fundamentais

Quando aplico **Clean Architecture** nos meus projetos, penso nela como uma forma de organizar meu código onde as regras de negócio ficam protegidas das dependências externas. É como construir uma casa com fundações sólidas - os cômodos podem mudar, mas a estrutura permanece forte.

Para mim, o objetivo principal é criar sistemas que posso manter facilmente, testar sem complicações e evoluir sem dores de cabeça.

### Princípios que sigo:

- **Separação de responsabilidades:** Cada parte do meu código tem uma função específica e bem definida.
- **Independência de frameworks:** Não deixo que meu React ou qualquer biblioteca contamine as regras de negócio.
- **Facilidade de teste:** Escrevo código que posso testar cada parte isoladamente.
- **Baixo acoplamento e alta coesão:** Quando mudo algo em uma camada, as outras permanecem estáveis.
- **Evolução camada por camada:** Quando adiciono funcionalidades, respeito os limites entre as camadas.

---

## Por que Escolhi Clean Architecture?

Adotei a Clean Architecture para organizar meu código em **camadas**, cada uma com uma **responsabilidade clara**. É como ter uma cozinha bem organizada - cada utensílio no seu lugar torna o processo de cozinhar mais eficiente e agradável.

Quando aplico esse conceito, consigo construir sistemas que são:

- **Independentes de Frameworks:** Meu negócio não depende do React ou de qualquer outra biblioteca externa. É como escrever uma história que pode ser publicada em qualquer formato - impresso, e-book ou audiolivro.

- **Testáveis:** Posso testar minhas regras de negócio sem precisar da interface gráfica ou banco de dados. Como um motor de carro que pode ser testado na bancada, antes de ser instalado.

- **Independentes da UI:** Posso mudar completamente a interface sem mexer na lógica. É como trocar a pintura e a decoração de um quarto sem mexer na estrutura da casa.

- **Independentes do Banco de Dados:** Se preciso migrar do MongoDB para PostgreSQL, posso fazer isso sem alterar minhas regras de negócio.

- **Independentes de agentes externos:** Minha lógica funciona sem saber se os dados vêm de uma API real ou de um mock para testes.

Isso me traz benefícios tangíveis:

- **Separação clara de responsabilidades:** Cada parte do meu sistema faz apenas uma coisa e a faz bem.
- **Manutenção simplificada:** Quando preciso corrigir um bug na UI, não preciso me preocupar em quebrar a lógica de negócio.
- **Organização intuitiva:** Sei exatamente onde procurar quando preciso modificar uma parte específica do sistema.

---

## Como Estruturo Minhas Pastas

Organizo meu projeto em quatro camadas principais, como andares de um prédio:

```
src/
├── domain/         # O alicerce: regras e entidades de negócio
├── application/    # O coração: orquestração e lógica da aplicação
├── infrastructure/ # Os serviços: conexões com o mundo externo
└── presentation/   # A fachada: componentes React e interface visual
```

### Como entendo cada camada:

- **`domain/`**: É o núcleo do meu aplicativo, como o alicerce de uma casa. Aqui coloco as **entidades** (objetos de negócio puros) e os **casos de uso** (regras de negócio específicas da aplicação). Esta camada não depende de nada externo - nem do React, nem de APIs, nem de formatação de dados.

  - **Exemplo prático:** Quando crio uma entidade `Statistic`, defino apenas seus atributos e comportamentos essenciais. Por exemplo:

  ```typescript
  export class Statistic {
    constructor(
      public id: string,
      public label: string,
      public value: number,
      public trend: "up" | "down" | "neutral"
    ) {}

    isPositive(): boolean {
      return this.trend === "up";
    }
  }
  ```

- **`application/`**: Esta é como a planta hidráulica e elétrica da casa - direciona o fluxo de dados. Aqui coloco minha lógica de orquestração, como hooks personalizados que conectam a UI às regras de negócio. Esta camada conhece o domínio, mas não sabe detalhes sobre React ou APIs.

  - **Exemplo prático:** Aqui crio um hook que orquestra a obtenção de estatísticas:

  ```typescript
  export function useStatistics() {
    const [statistics, setStatistics] = useState<Statistic[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getStats = async () => {
        setIsLoading(true);
        try {
          // getStatisticsUseCase é uma função do domínio
          const data = await getStatisticsUseCase();
          setStatistics(data);
        } catch (error) {
          console.error("Falha ao carregar estatísticas", error);
        } finally {
          setIsLoading(false);
        }
      };

      getStats();
    }, []);

    return { statistics, isLoading };
  }
  ```

- **`infrastructure/`**: Esta camada é como as conexões externas da casa - água, luz, internet. Aqui implemento o acesso a APIs, localStorage ou qualquer serviço externo. Esta camada conhece detalhes técnicos que o domínio não precisa saber.

  - **Exemplo prático:** Aqui crio um serviço para buscar dados da API:

  ```typescript
  export class StatisticsApiService {
    async getAll(): Promise<Statistic[]> {
      try {
        const response = await fetch("https://api.exemplo.com/statistics");
        const data = await response.json();
        return data.map(
          (item) => new Statistic(item.id, item.label, item.value, item.trend)
        );
      } catch (error) {
        console.error("Erro na API", error);
        throw new Error("Falha ao buscar estatísticas");
      }
    }
  }
  ```

- **`presentation/`**: Esta é a fachada e decoração da casa - o que os visitantes veem. Contém meus componentes React, páginas, estilos e toda a parte visual. Esta camada se comunica apenas com a camada de aplicação, usando hooks ou serviços.

  - **Exemplo prático:** Um componente que exibe as estatísticas:

  ```tsx
  function StatisticsList() {
    const { statistics, isLoading } = useStatistics();

    if (isLoading) return <LoadingSpinner />;

    return (
      <div className="statistics-grid">
        {statistics.map((stat) => (
          <StatisticCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>
    );
  }
  ```

---

## Como Funciona o Fluxo de Dados na Minha Arquitetura

Penso no fluxo de dados como uma linha de montagem, onde cada etapa tem uma responsabilidade específica:

1. Um **componente React** (minha interface) solicita dados através de um hook
2. O **hook** (minha orquestração) chama um caso de uso
3. O **caso de uso** (minha lógica de negócio) solicita dados à infraestrutura
4. A **infraestrutura** (minha conexão com o mundo) busca os dados na fonte
5. Os dados retornam pelo mesmo caminho até o componente React

**Um exemplo do meu dia a dia:**

Quando implemento o dashboard de estatísticas:

1. Meu componente `DashboardPage` chama `const { statistics } = useStatistics()`
2. O hook `useStatistics` chama `getStatisticsUseCase()`
3. O caso de uso chama `statisticsRepository.getAll()`
4. O repositório faz uma chamada à API real ou mock
5. Os dados fluem de volta até meu componente, que renderiza os `<StatisticCard />` para cada estatística

É como um garçom que leva seu pedido à cozinha, e depois traz sua comida até a mesa - cada um com sua função bem definida.

---

## Práticas Que Adoto no Meu Dia a Dia

- **Testes por camada:** Testo cada parte isoladamente. Como um médico que verifica cada órgão separadamente antes de avaliar o corpo todo.

  ```typescript
  // Teste do caso de uso isoladamente
  test("should return formatted statistics", async () => {
    const mockRepository = {
      getAll: jest.fn().mockResolvedValue([
        /*dados mockados*/
      ]),
    };
    const result = await getStatisticsUseCase(mockRepository);
    expect(result).toHaveLength(4);
  });
  ```

- **Evolução gradual:** Quando adiciono novos recursos, como filtros, faço isso preservando a estrutura de camadas:

  ```typescript
  // Adiciono parâmetros sem quebrar a arquitetura
  export function useStatistics(filter?: StatisticFilter) {
    // lógica que usa o filtro...
  }
  ```

- **Refatoração constante:** Mantenho meu código limpo através de pequenas melhorias contínuas, como um jardineiro que cuida diariamente do jardim.

- **Testes com mocks:** Isolo as dependências externas durante os testes:

  ```typescript
  // Na hora de testar, substituo a API real por uma simulada
  const mockApiService = {
    getStatistics: jest.fn().mockResolvedValue([
      /* dados de teste */
    ]),
  };
  ```

- **Extensibilidade:** Projeto meu código para crescer facilmente, como blocos de LEGO que podem ser expandidos em qualquer direção.

---

## Benefícios Que Percebo Diariamente

- **Manutenção mais fácil:** Quando preciso corrigir um bug na interface, não me preocupo em quebrar a lógica de negócio.
- **Testabilidade ampliada:** Consigo testar cada parte independentemente, aumentando a confiança no meu código.
- **Adaptabilidade:** Quando preciso trocar uma biblioteca ou API, o impacto é contido em uma única camada.
- **Escalabilidade:** Meu projeto pode crescer organicamente sem virar uma "bola de neve" de código confuso.

---

## Como Resumo Minha Experiência

Aplicar Clean Architecture nos meus projetos me permite ter um código organizado e previsível, onde cada parte tem seu lugar e propósito claros.

É como manter uma casa bem organizada - sei onde cada coisa está, consigo fazer manutenções pontuais sem desmontar tudo, e posso reformar um cômodo sem afetar os demais.

**Meu compromisso pessoal:**  
Continuo respeitando as fronteiras entre camadas, escrevendo testes e evoluindo o sistema com cuidado. Acredito que esta disciplina arquitetural, embora exija mais esforço inicial, me economiza muito tempo e frustrações no longo prazo.
