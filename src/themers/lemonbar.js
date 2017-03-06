const fs = require('fs-promise')

async function lemonbar (theme, schemeName, file, fileName) {
	let update = file
	if (file === undefined) {
		update = theme
	} else {
		// Update the existing config file
	}

	try {
		await fs.writeFile(fileName, theme) 
	} catch (err) {
		console.log(err)
	}
}

module.exports = lemonbar
