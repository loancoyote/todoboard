import { FormValue } from '@/features/types';

export function isNotEmpty(value: FormValue) {
  return value?.trim() != '';
}

export function isEmpty(value: FormValue) {
  return value?.trim() === '';
}

export function isChanged(prevValue: string, newValue: string) {
  return prevValue !== newValue;
}
