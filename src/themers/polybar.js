const fs = require('fs-promise')
const { execSync } = require('child_process')
const { spawn } = require('child_process')

async function polybar(theme, schemeName, file, fileName) {
	// Write out the config
	try {
		await fs.writeFile(`${process.env.HOME}/.config/polybar/config`, theme)
	} catch (err) {
		console.log(err)
	}

	// restart polybar	
	try {
		execSync('killall -q polybar')	
	} catch(err) {
		// command throws error if it doesn't kill anything, which is fine
	}

	// Spawn a subprocess in detached state, then unreference it so it 
	// doesn't stop after parent exits
	const subprocess = spawn('polybar', ['example'], {
		deatched: true,
		stdio: 'ignore'
	})

	subprocess.unref()
}

module.exports = polybar
