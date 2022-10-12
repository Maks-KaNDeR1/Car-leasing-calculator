
export const strFmt = (val: number) => new Intl.NumberFormat('ru-RU').format(val)

export const numbFmt = (val: string) => Number(val.toString().split(/\s+/).join(''))
