const fs = require('fs-promise')
const { execSync, exec } = require('child_process')

async function rxvtUnicode (theme, schemeName, file, fileName, scheme) {
	let update = clearSettings(file)
	update = update + theme

	try {
		await fs.writeFile(fileName, update)
	} catch (err) {
		console.log(`Couldnt write .Xresources file: ${err}`)
	}

	execSync('xrdb ' + fileName)

}

function clearSettings (file) {
	// Remove the previous scheme settings
	// Regex for color settings
	let colorReg = /(URxvt)?\*(color[0-9]{1,2}|background|foreground|cursorColor|scrollColor|highlightColor|highlightTextColor):.*\n*/g
	let nameReg = /!\s(Base16|Scheme:).*\n*/g // Regex for the Name and Scheme info comments

	// Regex for define color statements (from dkeg templates)
	let defineReg = /#define\s(bg|fg|blk|bblk|b?red|b?ylw|b?grn|b?blu|b?mag|b?cyn|b?wht)\s+.*\n/g
	let metaReg = /^!\s*(Title|Author|Created|Colors).*\n*/gm

	let update = file.replace(colorReg, '')
	update = update.replace(nameReg, '')
	update = update.replace(defineReg, '')
	update = update.replace(metaReg, '')
	return update
}

module.exports = rxvtUnicode
