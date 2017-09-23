const fs = require('fs-promise')

async function termite(theme, schemeName, file, fileName) {

	let colorSectionReg = /\[colors\]\n*/g
	let colorReg = /color[0-9]{1,2}.*\n*/g
	let cursorBgFgReg = /cursor_(background|foreground).*\n*/g
	let bgFgReg = /(background|foreground).*\n*/g

	let update
	update = file.replace(colorSectionReg, "")
	update = update.replace(colorReg, "")
	update = update.replace(cursorBgFgReg, "")
	update = update.replace(bgFgReg, "")
	
	update = update + theme

	try {
		await fs.writeFile(fileName, update)
	} catch (err) {
		console.log(err)
	}
}

module.exports = termite
