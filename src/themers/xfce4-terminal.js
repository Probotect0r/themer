const fs = require('fs-promise')

async function xfce4Terminal(theme, schemeName, file, fileName) {
	// Write the color scheme to the vim folder
	
	// Remove the existing colors from the config
	let fgBgReg = /Color(Foreground|Background)=.*\n*/g
	let cursorReg = /ColorCursor(Foreground)?=.*\n*/g
	let paletteReg = /ColorPalette=.*\n*/g

	let update = file.replace(fgBgReg, '')
	update = update.replace(cursorReg, '')
	update = update.replace(paletteReg, '')

	// Append the theme to the config
	update = update + theme

	// Write it to file
	try {
		await fs.writeFile(fileName, update)
	} catch (err) {
		console.log(err)
	}
}

module.exports = xfce4Terminal
