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

  // Make sure the results directory exists and is empty otherwise create it
  const dir = __dirname + '/themes' 
  try {
    await fs.emptyDir(dir)
  } catch(err){
    console.log(`Couldn't create the themes directory: ${err}`)
  }
  
  // Load all the schemes files
  let basePath = 'node_modules/base16-builder/dist/db/'
  let schemes
  try{
    schemes = await fs.readdir(basePath + 'schemes')
  } catch(error){
    return console.log('Couldn\'t read the schemes:', error) 
  }

  // Get a random int between 0 and # of schmes
  let num = Math.floor(Math.random() * (schemes.length + 1))

  // Get the scheme name
  let schemeName = schemes[num].substring(0, schemes[num].length - 4)
  console.log(schemeName) 

  // Get the chosen scheme file
  let scheme
  try{
    scheme = await fs.readFile(basePath + 'schemes/' + schemes[num], 'utf8')
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
