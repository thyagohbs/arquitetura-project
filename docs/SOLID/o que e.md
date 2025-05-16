# Princípios SOLID no Desenvolvimento Front-end com React e TypeScript

Os princípios SOLID são fundamentais para que eu construa aplicações front-end robustas, escaláveis e fáceis de manter. Sempre que desenvolvo com React e TypeScript, aplico essas cinco diretrizes para garantir um código limpo, organizado e preparado para crescer. Vou explicar cada princípio, como entendo e aplico no meu dia a dia, e mostrar exemplos reais do projeto de dashboard.

## As Cinco Diretrizes SOLID

### 1. Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única

- **O que é?**  
  Um componente, hook, módulo ou função deve ter apenas uma razão para mudar. Ou seja, ele deve ter uma única responsabilidade ou tarefa principal. Se um módulo faz muitas coisas, qualquer alteração em uma delas pode afetar as outras de forma inesperada.

- **Como aplico no meu código:**

  - Nos **componentes**, mantenho o foco em uma única parte da interface ou aspecto visual.
  - Meus **hooks** encapsulam apenas uma lógica específica que posso reutilizar.
  - Minhas **funções utilitárias** realizam uma tarefa única e bem definida.

- **Exemplo aplicado no projeto:**

  - Quando criei o `StatisticCard.tsx`, garanti que ele fosse responsável apenas por exibir os dados de uma estatística. Se a aparência do card precisar mudar, sei exatamente onde mexer.
  - No `getStatisticsUseCase.ts`, centralizei apenas a lógica para obter as estatísticas. Se a fonte de dados mudar, só preciso alterar este arquivo.
  - Na `DashboardPage.tsx`, orquestro os componentes e estados da página, delegando responsabilidades específicas para os componentes filhos e casos de uso.

- **Minha regra de ouro:**  
  Quando percebo um arquivo crescendo demais ou assumindo muitas responsabilidades, é hora de dividi-lo. Sempre me pergunto: "Este componente ou função está fazendo mais de uma coisa?"

---

### 2. Open/Closed Principle (OCP) - Princípio Aberto/Fechado

- **O que é?**  
  Escrevo meu código para ser extensível sem precisar modificá-lo. Ou seja, entidades de software devem ser abertas para extensão, mas fechadas para modificação. Isso permite adicionar novas funcionalidades sem alterar o código já testado e funcionando.

- **Como aplico no meu código:**

  - Projeto meus **componentes** com props flexíveis e uso composição para permitir extensões.
  - Desenvolvo **hooks** que aceitam parâmetros para alterar comportamentos sem modificar o código interno.

- **Exemplo aplicado no projeto:**

  - No `StatisticCard.tsx`, adicionei uma prop como `renderIcon?: (type: string) => React.ReactNode` para permitir personalizar o ícone sem mexer no código do componente.
  - Quando criei o hook `useStatistics`, fiz com que ele aceitasse parâmetros opcionais de filtro, permitindo adaptá-lo a diferentes necessidades sem alterar sua implementação principal.

- **Minha regra de ouro:**  
  Antes de modificar um componente existente, me pergunto: "Posso tornar isso configurável através de props ou composição em vez de alterar o código interno?"

---

### 3. Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov

- **O que é?**  
  Se crio um componente que estende outro, o novo deve funcionar corretamente onde o original era usado. Ou seja, componentes derivados devem ser substituíveis pelos básicos sem quebrar o sistema.

- **Como aplico no meu código:**

  - Quando crio variações de componentes, mantenho a compatibilidade com as props e comportamentos esperados.
  - Se tenho uma hierarquia de componentes, garanto que os componentes derivados possam substituir os básicos sem problemas.

- **Exemplo aplicado no projeto:**

  - Se tenho um `BaseCard` e crio um `StatisticCard` que o estende, garanto que qualquer lugar que usa o `BaseCard` possa usar o `StatisticCard` sem problemas.
  - Na `DashboardPage`, posso iterar sobre uma lista e renderizar diferentes tipos de cards, desde que todos aceitem a prop `statistic` conforme o contrato esperado.

- **Minha regra de ouro:**  
  Quando crio um componente baseado em outro, sempre me pergunto: "Se eu substituir o original por este novo em todos os lugares, tudo continuará funcionando como esperado?"

---

### 4. Interface Segregation Principle (ISP) - Princípio da Segregação de Interface

- **O que é?**  
  Não obrigo meus componentes a aceitar props que não vão utilizar. Prefiro interfaces pequenas e específicas, em vez de uma interface grande e genérica.

- **Como aplico no meu código:**

  - Defino **tipos de props** específicos que contêm apenas o que o componente realmente precisa.
  - Divido **contextos grandes** em menores e mais focados.

- **Exemplo aplicado no projeto:**

  - Em vez de passar um objeto `statistic` completo com muitos campos para o `StatisticCard`, extraio apenas as propriedades necessárias:

    ```tsx
    // Em vez disso:
    <StatisticCard statistic={bigStatObject} />

    // Prefiro isso:
    <StatisticCard
      label={statistic.label}
      value={statistic.value}
      type={statistic.type}
    />
    ```

  - Assim, o componente fica mais simples, previsível e fácil de testar.

- **Minha regra de ouro:**  
  Quando defino as props de um componente, me pergunto: "Este componente realmente precisa de todos esses dados?"

---

### 5. Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência

- **O que é?**  
  Faço com que meus componentes e módulos de alto nível dependam de abstrações, não de implementações concretas. Isso reduz o acoplamento e facilita a troca de implementações.

- **Como aplico no meu código:**

  - Meus componentes de UI dependem de hooks e casos de uso que são abstrações, não diretamente de chamadas de API.
  - Uso injeção de dependência para desacoplar as camadas da minha aplicação.

- **Exemplo aplicado no projeto:**

  - Na arquitetura do dashboard, faço com que a página `DashboardPage` dependa do `getStatisticsUseCase`, que por sua vez depende de uma interface `IStatisticsRepository`:

    ```tsx
    // Defino uma interface para o repositório
    interface IStatisticsRepository {
      getAll(): Promise<Statistic[]>;
    }

    // Meu caso de uso depende da interface, não da implementação
    function getStatisticsUseCase(repository: IStatisticsRepository) {
      return repository.getAll();
    }

    // Na minha página, posso usar qualquer implementação do repositório
    function DashboardPage() {
      const statistics = useStatistics(new ApiStatisticsRepository());
      // ou para testes: useStatistics(new MockStatisticsRepository());

      return (/* renderização dos dados */);
    }
    ```

  - Assim, posso trocar a fonte de dados sem precisar alterar a lógica da página ou dos componentes.

- **Minha regra de ouro:**  
  Estruturo meu código para que as dependências apontem para abstrações (interfaces/tipos) e não para implementações específicas, perguntando sempre: "Se eu precisar trocar esta implementação, quantos arquivos precisarei modificar?"

---

Aplicar estes princípios SOLID no meu trabalho diário como desenvolvedor front-end transformou a maneira como estruturo meus projetos. No começo pode parecer um esforço extra, mas com a prática se torna natural e os benefícios são enormes: código mais organizado, fácil de testar, e muito mais adaptável a mudanças. Quando trabalho em equipe, estes princípios se tornam ainda mais valiosos, criando uma base sólida para colaboração e crescimento sustentável do projeto.
