export const replaceComSimpleDobleComa = (palabras) => {
  return palabras.replace(/[']/g, '^').replace(/["]/g, 'ç').replace(/[,]/g, '|')
}
