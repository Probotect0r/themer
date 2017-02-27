import fs from 'fs-promise'

async function dkegLemonbar (theme, schemeName, file) {
  let update = file
  if (file === undefined) {
    update = theme
  } else {
    // Update the existing config file
  }

  try {
    await fs.writeFile(`${process.env.HOME}/.config/admiral.d/config`, theme) 
  } catch (err) {
    console.log(err)
  }
}

export {
  dkegLemonbar
}
