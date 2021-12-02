export const displayDate = (date) => {
  let temp = ''

  // Legger til dato
  date.getDate() < 10
    ? (temp += '0' + date.getDate())
    : (temp += date.getDate())

  temp += '.'

  // Legger til måned
  // Starter på 0
  date.getMonth() < 9
    ? (temp += '0' + date.getMonth() + 1)
    : (temp += date.getMonth() + 1)

  temp += '.'

  temp += date.getYear().toString().substring(0, 2)

  return temp
}
