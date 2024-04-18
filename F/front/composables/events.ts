export const changedImageEvent = (e:Event) => {
  const inputElement = e.target as HTMLInputElement
  return inputElement?.files?.[0] || false
}