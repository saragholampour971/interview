export const parseAmount = (value: number | string) => {
  return Number(value).toLocaleString('en-AU').toString()
}
