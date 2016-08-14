/*
 * Author: Sagar Desai
 * Description: Purpose of this project is to randomly generate a full theme for linux
 * environment based on a base16 theme. This includes generating themes for multiple different applications.
 *
 */

import { buildTheme } from 'base16-builder'
import { apps, brightness } from './config.js'
import fs from 'fs-promise'

(async function(){

  // Need to check if there was a scheme name specified and use that
  // Otherwise choose a random scheme
  let schemeName
  let basePath = 'node_modules/base16-builder/dist/db/'
  console.log(process.argv)

  if(process.argv[2] != null){
    schemeName = process.argv[2]
  }
  else {
    // Load all the schemes files
    let schemes
    try{
      schemes = await fs.readdir(basePath + 'schemes')
    } catch(error){
      return console.log('Couldn\'t read the schemes:', error)
    }

    // Get a random int between 0 and # of schmes
    let num = Math.floor(Math.random() * (schemes.length + 1))

    // Get the scheme name
    schemeName = schemes[num].substring(0, schemes[num].length - 4)

  }
  console.log('schemeName:', schemeName)

  // Get the chosen scheme file
  let scheme
  try{
    scheme = await fs.readFile(basePath + 'schemes/' + schemeName + '.yml', 'utf8')
  } catch(error){
    console.log('Couldnt read the scheme file.' + error)
  }

  // Get all the templates for the specified apps
  let templates = {}
  await Promise.all(Object.keys(apps).map(async (app) => {
    try{
      templates[app] = await fs.readFile(`${basePath}templates/${app}/${brightness}.ejs`, 'utf8')
    } catch(err){
      console.log(`Couldnt read template for ${app}: ${err}`)
    }
  }))
  
  // The different promises have to be done in series to make sure
  // there are no file write conflicts when the same file is being edited for 
  // two different files (i.e vim and vim_airline)
  let keys = Object.keys(apps)
  for(let i = 0; i < keys.length; i++){
    let theme = buildTheme(scheme, templates[keys[i]])  
    try {
      await apps[keys[i]].apply(theme, schemeName)
    } catch(err){
      console.log(`Couldn't apply the theme: ${err}`)
    }
  }

})()
