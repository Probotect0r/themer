const fs = require('fs-promise')

async function vim(theme, schemeName, file, fileName) {
  // Need to change the colorscheme to generic, and write out the generic color scheme
  try {
    await fs.writeFile(fileName, theme) 
  } catch (err) {
    console.log(err)
  }

  let reg = /colorscheme\s[a-zA-z0-9-]*\n/
  let update = file.replace(reg, `colorscheme generic\n`)
}

module.exports = vim
