const fs = require('fs-promise')

async function termite(theme, schemeName, file, fileName) {
	try {
		await fs.writeFile(`${process.env.HOME}/.config/termite/config`, theme)
	} catch (err) {
		console.log(err)
	}
}

module.exports = termite
