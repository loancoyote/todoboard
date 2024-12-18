type FormValue = string | null;

export function isNotEmpty(value: FormValue) {
  return value?.trim() != '';
}
