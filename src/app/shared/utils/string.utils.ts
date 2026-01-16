/**
 * Normaliza un string removiendo tildes/acentos para permitir búsquedas insensibles a acentos
 * @param str El string a normalizar
 * @returns El string sin acentos
 * 
 * @example
 * normalizeString('López') // 'lopez'
 * normalizeString('José María') // 'jose maria'
 */
export function normalizeString(str: string): string {
  return str
    .normalize('NFD') // Descompone los caracteres acentuados en caracteres base + marcas diacríticas
    .replace(/[\u0300-\u036f]/g, '') // Remueve las marcas diacríticas
    .toLowerCase() // Convierte a minúsculas para búsqueda case-insensitive
    .trim(); // Remueve espacios al inicio y final
}

/**
 * Comprueba si un texto contiene un término de búsqueda de forma insensible a acentos y mayúsculas
 * @param text El texto donde buscar
 * @param searchTerm El término de búsqueda
 * @returns true si el texto contiene el término de búsqueda
 * 
 * @example
 * containsIgnoringAccents('López García', 'lopez') // true
 * containsIgnoringAccents('López García', 'garcía') // true
 * containsIgnoringAccents('López García', 'garcia') // true
 */
export function containsIgnoringAccents(text: string, searchTerm: string): boolean {
  return normalizeString(text).includes(normalizeString(searchTerm));
}
