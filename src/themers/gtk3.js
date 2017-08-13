const fs = require('fs-promise')

async function gtk3(theme, schemeName, file, fileName) {
	// Write the color scheme to the vim folder
	try {
		await fs.writeFile(`${process.env.HOME}/.config/gtk-3.0/gtk.css`, theme) 
	} catch (err) {
		console.log(err)
	}
	
}

module.exports = gtk3

