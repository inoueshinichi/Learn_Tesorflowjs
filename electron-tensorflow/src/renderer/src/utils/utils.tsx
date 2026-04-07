




// Timer
export type Sleep = (ms: number) => Promise<void>
export const sleep: Sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


