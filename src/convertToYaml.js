import yaml from 'js-yaml'
import fs from 'fs-promise'
import path from 'path'

async function convertToYaml () {
  let basePath = path.join(__dirname + '/../db/dkeg/schemes/')

  let commentReg = /(^!.*)/gm
  let defineReg = /^#define\s/gm
  let nameReg = /(^[a-zA-Z0-9]+)/gm
  let colorReg = /(#[a-zA-Z0-9]{6})/g

  // Get the schemes
  let schemes
  try {
    schemes = await fs.readdir(basePath)
  } catch (error) {
    return console.log('Couldn\'t read the schemes:', error)
  }

  // Convert each scheme and save with yaml extension
  await Promise.all(schemes.map(async (scheme) => {
    console.log(scheme)
    let file
    try {
      file = await fs.readFile(basePath + scheme, 'utf8')
    } catch (err) {
      console.log(err)
    }

    // Turn comment into yaml comment
    let update = file.replace(commentReg, '#$1')
    update = update.replace(defineReg, '')
    update = update.replace (nameReg, "$1:")
    update = update.replace(colorReg, '"$1"')

    try {
      await fs.writeFile(basePath + scheme + '.yml', update)
    } catch (err) {
      console.log('Could not write file:', err)
    }

  })) 
}

convertToYaml()
  .catch(err => {
    console.log(err)
  })
