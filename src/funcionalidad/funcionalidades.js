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


export function formatDate(fechaApi) {
  // Convertir la cadena a un objeto Date
  const fecha = new Date(fechaApi);

  // Obtener día, mes y año
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses empiezan desde 0
  const año = fecha.getFullYear();

  // Formatear la fecha como 30/8/2024
  return `${dia}/${mes}/${año}`;
}



export function getFirstLetters(str1 = '', str2 = '') {
  // Asegúrate de que str1 y str2 son cadenas
  const firstLetter1 = typeof str1 === 'string' && str1.length > 0 ? str1.charAt(0).toLowerCase() : '';
  const firstLetter2 = typeof str2 === 'string' && str2.length > 0 ? str2.charAt(0).toLowerCase() : '';
  
  // Combina las letras y las retorna
  return firstLetter1 + firstLetter2;

}