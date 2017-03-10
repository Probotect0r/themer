const fs = require('fs-promise')

async function addGuiColors () {
	// Some comment
	let file
	try {
		file = await fs.readFile(__dirname + '/../../db/templates/vim/dark.ejs', 'utf8')
	} catch (err) {
		console.log(err)
	}

	let fgreg = /(ctermfg=([0-9]{2}))/g
	let bgreg = /(ctermbg=([0-9]{2}))/g

	file = file.replace(fgreg, '$1 guifg=$2')
	file = file.replace(bgreg, '$1 guibg=$2')

	// Replace with actual colours
	file = file.replace(/guifg=00/g, 'guifg=<%- blk %>')	
	file = file.replace(/guifg=01/g, 'guifg=<%- red %>')	
	file = file.replace(/guifg=02/g, 'guifg=<%- grn %>')	
	file = file.replace(/guifg=03/g, 'guifg=<%- ylw %>')	
	file = file.replace(/guifg=04/g, 'guifg=<%- blu %>')	
	file = file.replace(/guifg=05/g, 'guifg=<%- mag %>')	
	file = file.replace(/guifg=06/g, 'guifg=<%- cyn %>')	
	file = file.replace(/guifg=08/g, 'guifg=<%- bblk %>')	

	file = file.replace(/guibg=00/g, 'guibg=<%- blk %>')	
	file = file.replace(/guibg=01/g, 'guibg=<%- red %>')	
	file = file.replace(/guibg=02/g, 'guibg=<%- grn %>')	
	file = file.replace(/guibg=03/g, 'guibg=<%- ylw %>')	
	file = file.replace(/guibg=04/g, 'guibg=<%- blu %>')	
	file = file.replace(/guibg=05/g, 'guibg=<%- mag %>')	
	file = file.replace(/guibg=06/g, 'guibg=<%- cyn %>')	
	file = file.replace(/guibg=08/g, 'guibg=<%- bblk %>')	

	// Write the update
	try {
		await fs.writeFile(__dirname + '/../../db/templates/vim/dark2.ejs', file)
	} catch (err) {
		console.log(`Couldnt write i3 config file: ${err}`)
	}
}

addGuiColors()
	.catch(err => console.log(err))
