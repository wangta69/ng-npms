export function only_number(value: any): value is boolean {
  return  /^\d+$/.test(value);
}
