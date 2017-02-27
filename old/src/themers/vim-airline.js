import fs from 'fs-promise'

async function base16VimAirline (theme, schemeName, file) {
  // Get the scheme name used in the template so we can use
  // that as the file name (I think they have to be the same?)
  let sNameReg = /#base16[a-z0-9_-]*#/
  let matches = theme.match(sNameReg)
  schemeName = matches[0].substring(1, matches[0].length - 1)

  // Write the theme file to the .vim/bundle/v folder
  let fileName = schemeName
  try {
    await fs.writeFile(`${process.env.HOME}/.vim/bundle/vim-airline-themes/autoload/airline/themes/${fileName}.vim`, theme)
  } catch (err) {
    console.log(`Couldnt write the theme file: ${err}`)
  }

  // find the colorscheme line in .vimrc file and change it to use the new theme
  let reg = /let\sg:airline_theme\s?=\s?'[a-zA-z0-9-]*'\n/g
  let update = file.replace(reg, `let g:airline_theme='${schemeName}'\n`)

  // Write the vimrc file
  try {
    await fs.writeFile(`${process.env.HOME}/.vimrc`, update)
  } catch (err) {
    console.log(`Couldnt write .vimrc: ${err}`)
  }
}

async function dkegVimAirline () {

}

export {
  dkegVimAirline,
  base16VimAirline
}
