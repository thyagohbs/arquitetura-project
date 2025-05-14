# Clean Architecture no Projeto de Dashboard

## Conceitos Fundamentais

**Clean Architecture** é um conjunto de princípios para organizar o código de forma que as regras de negócio fiquem isoladas das dependências externas (frameworks, APIs, banco de dados, etc).  
O objetivo é criar sistemas fáceis de manter, testar e evoluir.

### Princípios aplicados:

- **Separação de responsabilidades:** cada camada tem um papel claro.
- **Independência de frameworks:** o domínio não depende de React, APIs ou bibliotecas externas.
- **Facilidade de teste:** cada parte pode ser testada isoladamente.
- **Baixo acoplamento e alta coesão:** mudanças em uma camada afetam minimamente as outras.
- **Evolução orientada por camadas:** novas features e refatorações são feitas respeitando a arquitetura, sem misturar responsabilidades.

---

## Estrutura de Pastas

O projeto está organizado em quatro camadas principais:

```
src/
├── domain/         # Regras de negócio (entidades, casos de uso)
├── application/    # Orquestração, hooks, lógica de aplicação
├── infrastructure/ # Serviços externos (API, storage, etc)
└── presentation/   # Componentes React, páginas, estilos
```

### Camadas explicadas:

- **domain:** define as entidades e regras de negócio puras. Não depende de nenhuma outra camada.
- **application:** contém casos de uso e hooks que orquestram a lógica do sistema, conectando domínio e infraestrutura.
- **infrastructure:** implementa detalhes de acesso a dados, APIs e integrações externas. Pode ser facilmente substituída ou mockada.
- **presentation:** cuida da interface com o usuário, usando componentes React. Não contém lógica de negócio.

---

## Fluxo de Dados

O fluxo de dados segue o caminho:

1. **Componente React** (presentation) solicita dados via **hook** (application)
2. O **hook** chama um **caso de uso** (application)
3. O **caso de uso** acessa a **infraestrutura** (API, mock, etc)
4. Os dados retornam para o **hook** e, por fim, para o componente

**Exemplo prático:**

- O componente `Dashboard` usa o hook `useStatistics`
- O hook chama o caso de uso `getStatistics`
- O caso de uso pode buscar dados em um serviço da infraestrutura (`statisticsApi`)
- O resultado é exibido em componentes de UI, como `StatisticCard`

---

## Novos Conceitos e Práticas Adotadas

- **Testes automatizados por camada:** Hooks, casos de uso e componentes são testados isoladamente, garantindo confiabilidade e facilitando refatorações.
- **Evolução segura:** Novas features (como filtros) são implementadas criando parâmetros nos hooks e casos de uso, sem quebrar a separação de camadas.
- **Refatoração contínua:** O código é constantemente melhorado para manter clareza e aderência à arquitetura, sem alterar o comportamento externo.
- **Mocks e injeção de dependências:** Durante os testes, serviços de infraestrutura são mockados para garantir que a lógica de negócio seja testada de forma independente.
- **Extensibilidade:** A arquitetura permite adicionar novas fontes de dados, novos tipos de estatísticas ou novos componentes de UI sem impactar o restante do sistema.

---

## Benefícios

- **Manutenção facilitada:** mudanças em uma camada não quebram as outras.
- **Testabilidade:** lógica de negócio pode ser testada sem depender da UI ou de APIs reais.
- **Evolução:** fácil adicionar novas fontes de dados ou trocar frameworks.
- **Escalabilidade:** o projeto pode crescer sem virar uma “massa de espaguete”.

---

## Resumo

A Clean Architecture aplicada neste projeto garante que cada parte do sistema tenha uma responsabilidade única e bem definida.  
O fluxo de dados é previsível e cada camada pode ser evoluída ou testada de forma independente, promovendo qualidade e sustentabilidade do código.

**Seu papel agora:**  
Sempre respeitar as fronteiras entre as camadas, aplicar testes e evoluir o sistema sem comprometer a arquitetura.  
Você será penalizado se misturar responsabilidades ou ignorar os princípios aqui descritos!
