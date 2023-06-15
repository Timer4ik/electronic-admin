export const debounce = (fc: any, ms: number) => {
    let timer: any = null
    return function (...args: any) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => fc(...args), ms)
    }
  }