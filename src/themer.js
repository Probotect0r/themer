import fs from 'fs-promise'
import { execSync } from 'child_process'

export async function vim(theme, schemeName){

  // Write the theme file to the .vim/colors/ folder
  let fileName = `base16_${schemeName}`
  try{
    await fs.writeFile(`${process.env.HOME}/.vim/colors/${fileName}.vim`, theme)
  } catch(err){
    console.log(`Couldnt write the theme file: ${err}`)
  }

  // Read the vimrc file
  let file
  try{
    file = await fs.readFile(`${process.env.HOME}/.vimrc`, 'utf8')
  } catch(err){
    console.log(`Couldn't read vimrc: ${err}`)
  }

  // find the colorscheme line in .vimrc file and change it to use the new theme
  let reg = /colorscheme\s[a-zA-z0-9-]*\n/
  let update = file.replace(reg, `colorscheme base16_${schemeName}\n`)

  // Write the vimrc file
  try{
    await fs.writeFile(`${process.env.HOME}/.vimrc`, update)
  } catch(err){
    console.log(`Couldnt write .vimrc: ${err}`)
  }
}

export async function vim_airline(theme, schemeName){
  let sNameReg = /#base16[a-z0-9_-]*#/
  let matches = theme.match(sNameReg)
  schemeName = matches[0].substring(1, matches[0].length - 1)
  
  // Write the theme file to the .vim/bundle/v folder
  let fileName = schemeName
  try{
    await fs.writeFile(`${process.env.HOME}/.vim/bundle/vim-airline-themes/autoload/airline/themes/${fileName}.vim`, theme)
  } catch(err){
    console.log(`Couldnt write the theme file: ${err}`)
  }

  // Read the vimrc file
  let file
  try{
    file = await fs.readFile(`${process.env.HOME}/.vimrc`, 'utf8')
  } catch(err){
    console.log(`Couldn't read vimrc: ${err}`)
  }

  // find the colorscheme line in .vimrc file and change it to use the new theme
  let reg = /let\sg:airline_theme\s?=\s?'[a-zA-z0-9-]*'\n/g
  let update = file.replace(reg, `let g:airline_theme='${schemeName}'\n`)

  // Write the vimrc file
  try{
    await fs.writeFile(`${process.env.HOME}/.vimrc`, update)
  } catch(err){
    console.log(`Couldnt write .vimrc: ${err}`)
  }
}


export async function rxvt_unicode(theme, schemeName){

  let file
  try{
    file = await fs.readFile(`${process.env.HOME}/.Xresources`, 'utf8')
  } catch(err){
    console.log(`Couldn't read vimrc: ${err}`)
  }

  // Remove the previous scheme settings
  let colorReg = /URxvt\*[a-zA-z0-9:\s]*#[0-9a-zA-Z]{6}\n/g // Regex for the color settings
  let nameReg = /^!\s(Base16|Scheme:)\s.*\n/gm // Regex for the Name and Scheme info comments
  let update = file.replace(colorReg, '').replace(nameReg, '')
  update = update + theme

  // Write the update
  try{
    await fs.writeFile(`${process.env.HOME}/.Xresources`, update)
  } catch(err){
    console.log(`Couldnt write .Xresources file: ${err}`)
  }
  
  // Need to update Xrdb
  execSync('xrdb ~/.Xresources')
}

// Applies the theme to the i3 config
export async function i3(theme, schemeName){
  let file
  try{
    file = await fs.readFile(`${process.env.HOME}/.config/i3/config`, 'utf8')
  } catch(err){
    console.log(`Couldn't read vimrc: ${err}`)
  }

  // Need to get the individual sections from the theme
  // Then replace the corresponding sections in the config with the new ones
  let update
  let clientReg = /(client.(focused|unfocused|urgent|focused_inactive)\s.*\n)+/
  let setColorReg = /(set\s\$base.{2}\s#.{6}\n)+/
  let barColorsReg = /colors\s{[a-zA-Z0-9\s\n$_#]*}/

  let clientColors = theme.match(clientReg)
  let setColors = theme.match(setColorReg)
  let barColors = theme.match(barColorsReg)
  //console.log('CLIENT COLORS IN THEME:', clientColors)
  //console.log('SET COLORS IN THEME:', setColors)
  //console.log('BAR COLORS IN THEME:', barColors)
  
  let testSetColors = file.match(setColorReg)
  if(testSetColors == null) update = '# Set colors\n' + setColors[0] + '\n' + file
  else update = file.replace(setColorReg, setColors[0])
  update = update.replace(clientReg, clientColors[0]).replace(barColorsReg, barColors[0])

  // Write the update
  try{
    await fs.writeFile(`${process.env.HOME}/.config/i3/config`, update)
  } catch(err){
    console.log(`Couldnt write i3 config file: ${err}`)
  }
}
