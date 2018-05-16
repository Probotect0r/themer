const fs = require('fs-promise')
const { execSync } = require('child_process')

async function awesome(compiledTheme, schemeName, file, fileName) {
	try {
		await fs.writeFile(fileName, compiledTheme)
	} catch (err) {
		console.log(`Couldnt write awesome config file: ${err}`)
	}

    try {
        execSync('echo "awesome.restart()" | awesome-client', {stdio: 'ignore'})
    } catch(err) {
    }
}

module.exports = awesome
