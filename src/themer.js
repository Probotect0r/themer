const { apps, appsConf, brightness } = require('./config.js')
const fs = require('fs-promise')
const path = require('path')
const yaml = require('js-yaml')
const { render } = require('ejs')

async function theme() {
    let basePath = path.join(__dirname, '/../db')

    let schemeName = await getSchemeName(basePath)

    console.log('Scheme: ', schemeName)

    const yamlOfScheme = await getYamlForScheme(basePath, schemeName)
    let scheme = yaml.load(yamlOfScheme)

    let templates = await getTemplates(basePath, apps, brightness)

    await applyThemeToApps(apps, scheme, templates, appsConf)
}

async function getSchemeName(basePath) {
    return process.argv[2] !== undefined ? process.argv[2] : await getRandomScheme(basePath)
}

async function getRandomScheme(basePath) {
    try {
        let schemes = await fs.readdir(`${basePath}/schemes/`)

        let num = Math.floor(Math.random() * (schemes.length))
        schemeName = schemes[num].substring(0, schemes[num].length - 4)

        return schemeName
    } catch (error) {
        return console.log("Couldn't read the schemes:", error)
    }
}

async function getYamlForScheme(basePath, schemeName) {
    try {
        let yamlScheme = await fs.readFile(`${basePath}/schemes/${schemeName}.yml`, 'utf8')
        return yamlScheme
    } catch (error) {
        console.log(`Could not read the scheme file: ${error}`)
    }
}

async function getTemplates(basePath, apps, brightness) {
    let allTemplates = await readAllTemplates(basePath, apps, brightness)

    let temps = allTemplates.reduce((acc, cur) => {
        let key = Object.keys(cur)[0]
        let value = Object.values(cur)[0]
        
        acc[key] = value

        return acc
    }, {})

    return temps
}

async function readAllTemplates(basePath, apps, brightness) {
    let allTemplates = await Promise.all(apps.map(async (app) => {
        let templatePath = `${basePath}/templates/${app}/${brightness}.ejs`
        let template = await fs.readFile(templatePath, 'utf8') 
        return { [app]: template }
    }))

    return allTemplates
}

async function applyThemeToApps(apps, scheme, templates, appsConf) {
    for (let app of apps) {
        console.log(`App: ${app}`)
        let theme = render(templates[app], scheme)

        let appFile = await getAppFile(appsConf[app].file)

        try {
            await appsConf[app].themer(theme, schemeName, appFile, appsConf[app].file, scheme)
        } catch (err) {
            console.log(`Couldn't apply the theme to ${app}: ${err}`)
        }
    }
}

async function getAppFile(filePath) {
    try {
        if (filePath != null && filePath !== "") {
            return await fs.readFile(filePath, 'utf-8')
        }
    } catch (err) {
        console.log(`Couldn't read the file ${filePath}: ${err}`)
    }
}


module.exports = theme
