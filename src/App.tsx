// Ponto de entrada da aplicação: renderiza o Dashboard
import { DashboardPage } from './presentation/pages/DashboardPage';
import { StatisticsApiRepository } from '../src/infrastructure/api/StatisticApiRepository';

// Crie a instância do serviço
const service = new StatisticsApiRepository();

// Passe a prop ao renderizar
function App() {
  return <DashboardPage service={service} />;
}

export default App;