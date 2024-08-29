export function formatCurrency(amount) {
    // Convierte el número en un string con formato de moneda
    return amount?.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  

  export function lastFourNumbers(number) {
    if (typeof number !== 'number' || isNaN(number)) {
      return NaN; 
  }}

  export function obtenerUltimosResultados(resultados) {    
    if (!Array.isArray(resultados)) {
        console.warn('obtenerUltimosResultados recibió un valor no válido:', resultados);
        return [];
    }
    return resultados
        .sort((a, b) => new Date(b.dated) - new Date(a.dated))
        .slice(0, 10);
}