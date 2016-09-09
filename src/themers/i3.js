import fs from 'fs-promise'

async function base16I3 (theme, schemeName, file) {
  // Need to get the individual sections from the theme
  // Then replace the corresponding sections in the config with the new ones
  let update
  let clientReg = /(client.(focused|unfocused|urgent|focused_inactive)\s.*\n)+/
  let setColorReg = /(set\s\$base.{2}\s#.{6}\n)+/
  let barColorsReg = /colors\s{[a-zA-Z0-9\s\n$_#]*}/

  // Get the different colors from the theme
  let clientColors = theme.match(clientReg)
  let setColors = theme.match(setColorReg)
  let barColors = theme.match(barColorsReg)

  // Check for already set colors
  if (file.match(setColorReg) == null) {
    update = '# Set colors\n' + setColors[0] + '\n' + file
  } else {
    update = file.replace(setColorReg, setColors[0])
  }

  // Check for already set window colors
  if (file.match(clientReg) == null) {
    update = update + '\n' + '# Set Window colors \n' + clientColors[0] + '\n'
  } else {
    update = update.replace(clientReg, clientColors[0])
  }

  // Check for already set bar colors
  if (file.match(barColorsReg) == null) {
    // bar colors aren't set
    // get the existing bar settigns and add the colors stuff to it
    let barReg = /bar\s{([\sa-zA-Z_0-9#:.]*)}/
    let barTest = file.match(barReg)

    // Add bar colors to the bar contents
    let barContents = barTest[1] + '\n  ' + barColors
    let newBar = 'bar {' + barContents + '\n}'

    // Update the current bar with new bar
    update = update.replace(barReg, newBar)
  } else {
    update = update.replace(barColorsReg, barColors[0])
  }

  // Write the update
  try {
    await fs.writeFile(`${process.env.HOME}/.config/i3/config`, update)
  } catch (err) {
    console.log(`Couldnt write i3 config file: ${err}`)
  }
}

async function dkegI3 () {

}

export {
  base16I3,
  dkegI3
}
