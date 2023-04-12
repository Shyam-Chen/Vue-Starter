import type { ButtonHTMLAttributes } from 'vue';

export interface ButtonProps extends ButtonHTMLAttributes {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  icon?: string;
}
