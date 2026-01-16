/**
 * Modelo de datos para items de navegación
 */

/**
 * Interface para un item del menú de navegación
 */
export interface NavMenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active?: boolean;
  badge?: number;
  roles?: string[];
  children?: NavMenuItem[];
}

/**
 * Configuración del menú de navegación
 */
export interface NavMenuConfig {
  items: NavMenuItem[];
  collapsed?: boolean;
}
