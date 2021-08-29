export const fromObjectToMultilineString = <T extends Record<string, any>>(obj: T) => {
  let string = ''

  Object.keys(obj).forEach(key => {
    string += `${key}: ${typeof obj[key] === 'string' ? `"${obj[key]}"` : obj[key]}` + '\n'
  })

  return string
}

export const cleanObject = <T>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([k, v]) => v !== null || v !== undefined))
