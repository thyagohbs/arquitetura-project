Estrutura de pastas:

1. **Presentation**  
   Camada responsável pela interface do usuário. Aqui ficam os componentes React, páginas, hooks de UI e tudo que lida diretamente com a apresentação dos dados.

2. **Domain**  
   Contém as regras de negócio puras, entidades, interfaces e casos de uso. Não depende de frameworks ou bibliotecas externas. Tudo aqui pode ser testado isoladamente.

3. **Data**  
   Implementa o acesso a dados: chamadas HTTP, integração com APIs, armazenamento local, etc. Traduz as entidades do domínio para formatos externos e vice-versa.

4. **Main**  
   Ponto de entrada da aplicação. Aqui ficam a inicialização do app, configuração de rotas, providers de contexto e injeção de dependências.
