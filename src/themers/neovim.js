const fs = require('fs-promise')

async function neovim(theme, schemeName, file, fileName) {
	// Write the color scheme to the nvim folder
	try {
		await fs.writeFile(fileName, theme) 
	} catch (err) {
		console.log(err)
	}
	
	// Update the vimrc to point to the colorscheme
	let reg = /colorscheme\s[a-zA-z0-9-]*\n/
	let update = file.replace(reg, `colorscheme generic\n`)
}

module.exports = neovim

