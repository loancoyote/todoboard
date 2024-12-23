import { FormValue } from '@/features/types';

export function isNotEmpty(value: FormValue) {
  return value?.trim() != '';
}
