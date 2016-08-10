/*
 * Author: Sagar Desai
 * Description: Purpose of this project is to randomly generate a full theme for linux 
 * environment based on a base16 theme. This includes generating themes for multiple different applications.
 *
 */


import { buildTheme } from 'base16-builder'
import { apps, brightness } from './config.js'
import fs from 'fs-promise'


// Need to loop through the list of desired applications for which to generate a theme
// For each, need to generate the config files, append  and write them to their respective places
// Some files (ex. i3) will need to have some changes added on certain lines, but most can be appended
// to the existing config file.


// Get all the base16 schemes and then pick a random one
// Loop through config

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

  await Promise.all(Object.keys(apps).map(async app => {
    // Generate the theme files for each app
    let theme = buildTheme(scheme, templates[app])  

    // Save each theme-file in the proper location
    let name = apps[app].name != undefined ?  `${apps[app].name}` : `${schemeName}_${app}${apps[app].ext}`
    console.log(name)
    try {
      await fs.writeFile(`${dir}/${name}`, theme)   
    } catch(err){
      console.log(`Couldn't write the theme file: ${err}`)
    }
  }))

  // For some apps, certain config files will have other info besides theme stuff
  // Need to figure out a way to add to those files, without disrupting other config
  // One method would be to have different functions for all the different apps that handle everything differently
  // and just send those functions the theme

})()
