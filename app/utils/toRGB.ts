export function toRGB(colorCode: string): string {
  const r = parseInt(colorCode.substring(1, 3), 16);
  const g = parseInt(colorCode.substring(3, 5), 16);
  const b = parseInt(colorCode.substring(5, 7), 16);
  return `rgb(${r},${g},${b})`
}


