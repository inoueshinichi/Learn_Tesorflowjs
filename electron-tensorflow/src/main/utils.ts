

export const getFileTimestamp = (date: number | Date = Date.now()): string => {
  const d = new Date(date)
  
  // 各要素を2桁に整形
  const pad = (n: number) => n.toString().padStart(2, '0')

  const yyyy = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const HH = pad(d.getHours())
  const mm = pad(d.getMinutes())
  const ss = pad(d.getSeconds())

  return `${yyyy}${MM}${dd}_${HH}${mm}${ss}`
}


export const getPreciseTimestamp = (): string => {
  const d = new Date()
  const datePart = d.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14) // YYYYMMDDHHmmss
  const msPart = d.getMilliseconds().toString().padStart(3, '0')
  
  return `${datePart}_${msPart}`
}