/*
 * Author: Probotect0r
 * Description: Purpose of this project is to randomly generate a full theme for linux
 * environment based on a color shceme. 
 * This includes generating themes for multiple different applications and applying them.
 * The color schemes are mostly taken from /r/unixporn community.
 */

const { apps, appsConf, brightness } = require('./config.js')
const fs = require('fs-promise')
const path = require('path')
const yaml = require('js-yaml')
const { render } = require('ejs')

async function theme() {
	let basePath = path.join(__dirname, '/../db/')
	
	let schemeName = await getSchemeName(basePath)

	console.log('schemeName:', schemeName)

	// Get the chosen scheme file
	let yamlScheme
	try {
		yamlScheme = await fs.readFile(basePath + 'schemes/' + schemeName + '.yml', 'utf8')
	} catch (error) {
		console.log('Couldnt read the scheme file.' + error)
	}

	let scheme = yaml.load(yamlScheme)

	// Load all the templates
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
		let theme
		theme = buildTheme(scheme, templates[app])

		// Read the file that will need to be edited
		let file
		try {
			if (appsConf[app].file) {
				file = await fs.readFile(appsConf[app].file, 'utf-8')
			}
		} catch (err) {
			console.log(`Couldn't read the file ${appsConf[app].file}: ${err}`)
		}
		
		// Apply the theme to the application
		try {
			await appsConf[app].themer(theme, schemeName, file, appsConf[app].file, scheme)
		} catch (err) {
			console.log(`Couldn't apply the theme to ${app}: ${err}`)
		}
	}
}

async function getSchemeName(basePath) {
	// Need to check if there was a scheme name specified and use that
	let schemeName
	if (process.argv[2] !== undefined) {
		schemeName = process.argv[2]
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

function buildTheme(scheme, template) {
	const theme = render(template, scheme)
	return theme
}

theme()
	.catch(err => {
		console.log(err)
	})
