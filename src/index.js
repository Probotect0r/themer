/*
 * Author: Sagar Desai
 * Description: Purpose of this project is to randomly generate a full theme for linux
 * environment based on a base16 theme. This includes generating themes for multiple different applications.
 */

import { buildTheme } from './RenderTheme.js'
import { apps, appsConf, brightness } from './config.js'
import fs from 'fs-promise'
import path from 'path'

async function theme () {
  let type = process.argv[2] === 'base16' ? 'base16' : 'dkeg'
  let basePath = path.join(__dirname, '/../db/' + type + '/')

  let schemeName = await getSchemeName(basePath, type)

  console.log('schemeName:', schemeName)

  // Get the chosen scheme file
  let scheme
  try {
    scheme = await fs.readFile(basePath + 'schemes/' + schemeName + '.yml', 'utf8')
  } catch (error) {
    console.log('Couldnt read the scheme file.' + error)
  }

  if (type === 'base16') {
    await applyBase16(schemeName, scheme, basePath)
  } else {
    await applyDkeg(schemeName, scheme, basePath)
  }
}

async function applyBase16 (schemeName, scheme, basePath) {
  // Get all the templates for the specified apps
  let templates = {}
  await Promise.all(apps.map(async (app) => {
    try {
      templates[app] = await fs.readFile(`${basePath}templates/${app}/${brightness}.ejs`, 'utf8')
    } catch (err) {
      console.log(`Couldnt read template for ${app}: ${err}`)
    }
  }))

  // The different promises have to be done in series to make sure
  // there are no file write conflicts when the same file is being edited for
  // two different templates (i.e vim and vim_airline)
  for (let app of apps) {
    console.log(app)
    // Build the theme
    let theme = buildTheme(scheme, templates[app])

    // Read the file that will need to be edited
    let file
    try {
      file = await fs.readFile(appsConf[app].file, 'utf-8')
    } catch (err) {
      console.log(`Couldn't read the file ${appsConf[app].file}: ${err}`)
    }

    try {
      await appsConf[app].base16(theme, schemeName, file)
    } catch (err) {
      console.log(`Couldn't apply the theme to ${app}: ${err}`)
    }
  }
}

async function applyDkeg (schemeName, scheme, basePath) {
  // The different promises have to be done in series to make sure
  // there are no file write conflicts when the same file is being edited for
  // two different templates (i.e vim and vim_airline)
  for (let app of apps) {
    console.log(app)

    // Read the file that will need to be edited
    let file
    try {
      file = await fs.readFile(appsConf[app].file, 'utf-8')
    } catch (err) {
      console.log(`Couldn't read the file ${appsConf[app].file}: ${err}`)
    }

    try {
      await appsConf[app].dkeg(scheme, schemeName, file, basePath)
    } catch (err) {
      console.log(`Couldn't apply the theme to ${app}: ${err}`)
    }
  }
}

async function getSchemeName (basePath, type) {
  // Need to check if there was a scheme name specified and use that
  let schemeName

  if (process.argv[3] !== undefined) {
    schemeName = process.argv[3]
  } else {
    let schemes
    try {
      schemes = await fs.readdir(basePath + 'schemes/')
    } catch (error) {
      return console.log('Couldn\'t read the schemes:', error)
    }

    // Get a random int between 0 and # of schmes
    let num = Math.floor(Math.random() * (schemes.length))

    // Get the scheme name
    schemeName = schemes[num].substring(0, schemes[num].length - 4)
  }

  return schemeName
}

theme()
  .catch(err => {
    console.log(err)
  })
