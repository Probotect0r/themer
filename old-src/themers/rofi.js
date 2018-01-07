const fs = require('fs-promise')
const execSync = require('child_process').execSync

async function rofi(theme, schemeName, file, fileName) {
  // reg for settings in 
  let reg = /^rofi\.(lines|width|color-(window|normal|active|urgent)|bw):.*\n*/gm
  // comment reg
  let commentReg = /^!Rofi\n*/gm
  // Other settings that aren't part of the template
  let otherReg = /^rofi\..*\n*/gm 

  // Clear template settings and comments
  let update = file.replace(reg, '')
  update = update.replace(commentReg, '')
  // Keep other settings for later
  let other = update.match(otherReg)
  // clear other settings
  update = update.replace(otherReg, '')

  // Add the template settings followed  by the other settings
  update = update + theme + '\n' + (other != null ? other.join('') : '')

  try {
    await fs.writeFile(fileName, update)
  } catch (err) {
    console.log(err)
  }

  execSync('xrdb ~/.Xresources')
}

module.exports = rofi
