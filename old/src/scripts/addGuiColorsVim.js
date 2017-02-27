import fs from 'fs-promise'

async function addGuiColors () {
  // Some comment
  let file
  try {
    file = await fs.readFile(__dirname + '/../../db/dkeg/templates/vim/dark.b.ejs', 'utf8')
  } catch (err) {
    console.log(err)
  }

  let fgreg = /(ctermfg=([0-9]{2}))/g
  let bgreg = /(ctermbg=([0-9]{2}))/g

  file = file.replace(fgreg, '$1 guifg=$2')
  file = file.replace(bgreg, '$1 guibg=$2')
  console.log(file)
}

addGuiColors()
  .catch(err => console.log(err))
