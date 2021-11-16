export const validate = {
  title(title) {
    // Checking if title's length is between 25 and 150 char
    const titleRegex = new RegExp('^[a-zA-Z0-9\\s_-]{25,150}$')
    if (!titleRegex.test(title)) {
      return {success: false, error: 'Tittelen må bestå av mellom 25 og 150 bokstaver'}
    }

    return {success: true, error: ''}
  },
  name(name) {
    // Checking if name have at least one space and big char in first- and last name
    const creatorRegex = new RegExp('^[A-Z]{1,1}[a-zA-Z]{1,}\\s[A-Z]{1,1}[a-zA-Z]{1,}$')
    if (!creatorRegex.test(name)) {
      return {success: false, error: 'Navn skal bestå av ett fornavn og ett etternavn med store forbokstaver'}
    }

    return {success: true, error: ''}
  },
  descriptionAndComment(value) {
    // Checking if description length is less than 250 char, but not 0
    const descriptionRegex = new RegExp('^[a-zA-Z0-9_-]{1,250}$')
    if (!descriptionRegex.test(value)) {
      return {success: false, error: 'Beskrivelsen kan ikke være lengre enn 250 bokstaver, men heller ikke tom'}
    }

    return {success: true, error: ''}
  }
}