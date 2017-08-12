const fs = require('fs-promise')
const { execSync } = require('child_process')

async function gtk2(theme, schemeName, file, fileName) {
	// Write the color scheme to the vim folder
	try {
		await fs.writeFile(`${process.env.HOME}/.gtkrc-2.0`, theme) 
	} catch (err) {
		console.log(err)
	}
	
}

module.exports = gtk2

