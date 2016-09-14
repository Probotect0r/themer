import fs from 'fs-promise'

async function base16Vim (theme, schemeName, file) {
  // Write the theme file to the .vim/colors/ folder
  let fileName = `base16_${schemeName}`
  try {
    await fs.writeFile(`${process.env.HOME}/.vim/colors/${fileName}.vim`, theme)
  } catch (err) {
    console.log(`Couldnt write the theme file: ${err}`)
  }

  // find the colorscheme line in .vimrc file and change it to use the new theme
  let reg = /colorscheme\s[a-zA-z0-9-]*\n/
  let update = file.replace(reg, `colorscheme base16_${schemeName}\n`)

  // Write the vimrc file
  try {
    await fs.writeFile(`${process.env.HOME}/.vimrc`, update)
  } catch (err) {
    console.log(`Couldnt write .vimrc: ${err}`)
  }
}

async function dkegVim (theme, schemeName, file) {
  // Need to change the colorscheme to generic, and write out the generic color scheme
  try {
    await fs.writeFile(`${process.env.HOME}/.vim/colors/generic.vim`, theme) 
  } catch (err) {
    console.log(err)
  }

  let reg = /colorscheme\s[a-zA-z0-9-]*\n/
  let update = file.replace(reg, `colorscheme generic\n`)
}

export {
  base16Vim,
  dkegVim
}
