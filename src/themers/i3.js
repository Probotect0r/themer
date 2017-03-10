const fs = require('fs-promise')
const { execSync } = require('child_process')

async function i3(theme, schemeName, file, fileName) {
	// Need to get the individual sections from the theme
	// Then replace the corresponding sections in the config with the new ones
	let update
	let clientReg = /(client.(focused|unfocused|urgent|focused_inactive)\s.*\n)+/
	let setColorReg = /(set\s\$color.{1,4}\s#.{6}\n)+/

	// Get the different colors from the theme
	let setColors = theme.match(setColorReg)
	let clientColors = theme.match(clientReg)

	// Check for already set colors
	if (file.match(setColorReg) == null) {
		update = '# Set colors\n' + setColors[0] + '\n' + file
	} else {
		update = file.replace(setColorReg, setColors[0])
	}

	// Check for already set window colors
	if (file.match(clientReg) == null) {
		update = update + '\n' + '# Set Window colors \n' + clientColors[0] + '\n'
	} else {
		update = update.replace(clientReg, clientColors[0])
	}

	// Write the update
	try {
		await fs.writeFile(fileName, update)
	} catch (err) {
		console.log(`Couldnt write i3 config file: ${err}`)
	}

	// reload i3
	execSync('i3-msg reload')
}

module.exports = i3
