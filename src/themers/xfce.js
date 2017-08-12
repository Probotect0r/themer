const { execSync } = require('child_process')

async function xfce(theme, schemeName, file, fileName) {
	execSync('xfce4-panel -r')
}

module.exports = xfce

