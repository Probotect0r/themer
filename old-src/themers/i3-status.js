const fs = require('fs-promise')

async function i3Status (theme, schemeName, file, fileName) {
	let update = ""
	let allColorReg = /(colors|color_good|color_degraded|color_bad).*\n/gm
	let generalReg = /general\s{([\sa-zA-Z0-9_="#]*)}/	

	// Remove all color lines
	update = file.replace(allColorReg, "")

	// Get all color lines from theme as 1 large line
	let colors = theme.match(allColorReg).reduce((sum, el) => { return sum + '\t' + el }, '')

	let generalTest = update.match(generalReg)
	let generalContent = generalTest[1] + '\n' + colors
	let newGeneral = 'general {' + generalContent + '\n}'
	update = update.replace(generalReg, newGeneral)

	// Write the update
	try {
		await fs.writeFile(fileName, update)
	} catch (err) {
		console.log(`Couldnt write i3 config file: ${err}`)
	}
}

module.exports = i3Status
