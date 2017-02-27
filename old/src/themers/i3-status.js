import fs from 'fs-promise'

async function base16I3Status (theme, schemeName, file) {
  let colorsReg = /((colors|color_)(good|bad|degraded|(\s=\s)).*\s*)+/
  let themeColors = theme.match(colorsReg)
  let update = file.replace(colorsReg, themeColors[0])

  try {
    await fs.writeFile(`${process.env.HOME}/.config/i3status/config`, update)
  } catch (err) {
    console.log(`Couldn't write the i3status config file: ${err}`)
  }
}

async function dkegI3Status () {

}
export {
  base16I3Status,
  dkegI3Status
}
