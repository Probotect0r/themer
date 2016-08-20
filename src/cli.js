#!/usr/bin/env node

import meow from 'meow'
import fs from 'fs-promise'
import path from 'path'
import {buildTheme} from './'
import openInBrowser from 'open'
import updateNotifier from 'update-notifier'
import chalk from 'chalk'

const logger = {
  log: message => console.log(message),
  error: message => console.error(chalk.red(message))
}

(async function() {
  async function resolvePath (path) {
    let stat = await fs.lstat(path)
    if (stat.isFile()) {
      return path
    }
  }

  const options = `Usage:
    $ base16-builder <-s scheme> <-t template> <-b light|dark>
    $ base16-builder <-s scheme path> <-t template path>

  Options:
    -s, --scheme        Build theme using this color scheme
    -t, --template      Build theme using this template
    -b, --brightness    Build theme using this brightness

  Commands:
    ls schemes      Opens an offline web page with a list of scheme names and their colors
    ls templates    Writes a list of available templates to the terminal

  Examples:
    $ base16-builder -s oceanicnext -t rxvt-unicode -b dark
    $ base16-builder --scheme oceanicnext --template rxvt-unicode --brightness dark
    $ base16-builder --scheme schemes/customScheme.yml --template templs/customTempl.ejs
    $ base16-builder ls schemes
    $ base16-builder ls templates`

  const cli = meow(options, {
    alias: {
      h: 'help',
      t: 'template',
      s: 'scheme',
      b: 'brightness'
    }
  })

  updateNotifier({pkg: cli.pkg}).notify()

  if (cli.input[0] === 'ls' &&
      cli.input[1] === 'schemes') {
    const schemesHtmlPath = path.join(__dirname, 'index.html')
    openInBrowser(schemesHtmlPath, function (err) {
      if (err) {
        logger.error(`An unexpected error occured while opening schemes preview: ${JSON.stringify(err)}`)
      } else {
        logger.log(`Your browser window should have just loaded this .html file: file://${schemesHtmlPath}`)
      }
    })
    return
  }

  if (cli.input[0] === 'ls' &&
      cli.input[1] === 'templates') {
    try {
      const dirPath = path.join(__dirname, `db/templates`)
      const templatePaths = await fs.readdir(dirPath)
      templatePaths.forEach(fileName => logger.log(fileName))
    } catch (err) {
      logger.error(err)
    }
    return
  }

  if (Object.keys(cli.flags).length === 0) {
    cli.showHelp()
    return
  }

  let {template: templNameOrPath, scheme: schemeNameOrPath, brightness} = cli.flags

  if (!templNameOrPath || !schemeNameOrPath) {
    logger.error('fatal: You did not supply valid arguments. Run \'base16-builder --help\' for guidance.')
    return
  }

  schemeNameOrPath = schemeNameOrPath.toLowerCase()
  templNameOrPath = templNameOrPath.toLowerCase()

  let templPath
  try {
    templPath = await resolvePath(templNameOrPath)
  } catch (error) {
  }

  if (!templPath) {
    if (!brightness) {
      logger.error('fatal: You did not supply valid arguments. Run \'base16-builder --help\' for guidance.')
      return
    }

    brightness = brightness.toLowerCase()
    if (brightness !== 'light' && brightness !== 'dark') {
      logger.error(
        'fatal: You did not supply valid arguments. The value for brightness must be \'light\' or \'dark\'.')
      return
    }

    templPath = path.join(__dirname, `db/templates/${templNameOrPath}/${brightness}.ejs`)
  }

  let schemePath
  try {
    schemePath = await resolvePath(schemeNameOrPath)
  } catch (error) {
  }

  if (!schemePath) {
    schemePath = path.join(__dirname, `db/schemes/${schemeNameOrPath}.yml`)
  }

  let templ
  try {
    templ = await fs.readFile(templPath, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger.error(`Could not find template ${templNameOrPath}.`)
      return
    }
    logger.error(`An unexpected error occured while loading the template: ${JSON.stringify(err)}`)
    return
  }

  let scheme
  try {
    scheme = await fs.readFile(schemePath, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger.error(`Could not find scheme ${schemeNameOrPath}.`)
    } else {
      logger.error(`An unexpected error occured while loading the scheme: ${JSON.stringify(err)}`)
    }
    return
  }

  let theme
  try {
    theme = buildTheme(scheme, templ)
  } catch (err) {
    logger.error(`An unexpected error occured while building your theme: ${JSON.stringify(err)}`)
    return
  }

  logger.log(theme)
})()
