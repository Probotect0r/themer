import fs from 'fs-promise'
import { execSync } from 'child_process'

async function base16RxvtUnicode (theme, schemeName, file) {
  let update = clearSettings(file)
  update = update + theme

  // Write the update
  try {
    await fs.writeFile(`${process.env.HOME}/.Xresources`, update)
  } catch (err) {
    console.log(`Couldnt write .Xresources file: ${err}`)
  }

  // Need to update Xrdb
  execSync('xrdb ~/.Xresources')
}

async function dkegRxvtUnicode (theme, schemeName, file) {
  let update = clearSettings(file)
  update = update + theme

  try {
    await fs.writeFile(`${process.env.HOME}/.Xresources`, update)
  } catch (err) {
    console.log(`Couldnt write .Xresources file: ${err}`)
  }

  execSync('xrdb ~/.Xresources')
}

function clearSettings (file) {
  // Remove the previous scheme settings
  // Regex for color settings
  let colorReg = /(URxvt)?\*(color[0-9]{1,2}|background|foreground|cursorColor|scrollColor|highlightColor|highlightTextColor):.*\n*/g
  let nameReg = /!\s(Base16|Scheme:).*\n*/g // Regex for the Name and Scheme info comments

  // Regex for define color statements (from dkeg templates)
  let defineReg = /#define\s(bg|fg|blk|bblk|b?red|b?ylw|b?grn|b?blu|b?mag|b?cyn|b?wht)\s+.*\n/g
  let metaReg = /^!\s*(Title|Author|Created|Colors).*\n*/gm

  let update = file.replace(colorReg, '')
  update = update.replace(nameReg, '')
  update = update.replace(defineReg, '')
  update = update.replace(metaReg, '')
  return update
}

export {
  base16RxvtUnicode,
  dkegRxvtUnicode
}
