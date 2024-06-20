export default function bringToFrontById(array: any[], targetId: string) {
  const index = array.findIndex((obj) => obj.id === targetId)

  if (index === -1) {
    return array
  }

  const [item] = array.splice(index, 1)

  array.unshift(item)

  return array
}
