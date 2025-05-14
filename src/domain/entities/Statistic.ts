// Entidade do domínio: representa uma estatística no sistema
export interface Statistic {
  id: string; // Identificador único
  label: string; // Nome da estatística
  value: number; // Valor numérico
  type: string; // novo campo para filtrar
}
