const fs = require('fs-promise')

async function i3Bar (theme, schemeName, file, fileName) {
	// Need to get the individual sections from the theme
	// Then replace the corresponding sections in the config with the new ones
	let update
	let barColorsReg = /colors\s{[a-zA-Z0-9\s\n$_#]*}/

	// Get the bar colors from the theme
	 let barColors = theme.match(barColorsReg)
	
	// TODO: Add check to see if the bar is there
	
	// Check for already set bar colors
	if (file.match(barColorsReg) == null) {
		// bar colors aren't set
		// get the existing bar settigns and add the colors stuff to it
		let barReg = /bar\s{([\sa-zA-Z_0-9#:.]*)}/
		let barTest = file.match(barReg)

		// Add bar colors to the bar contents
		let barContents = barTest[1] + '\n  ' + barColors
		let newBar = 'bar {' + barContents + '\n}'

		// Update the current bar with new bar
		update = file.replace(barReg, newBar)
	} else {
		update = file.replace(barColorsReg, barColors[0])
	}

	// Write the update
	try {
		await fs.writeFile(fileName, update)
	} catch (err) {
		console.log(`Couldnt write i3 config file: ${err}`)
	}
}

module.exports = i3Bar
