import { vim, vim_airline, rxvt_unicode, i3 } from './themer.js'

const apps = {
  'i3': {
    path: '~/.config/i3/',
    name: 'config',
    apply: i3
  },
  'rxvt-unicode': {
    path: '~/',
    name: '.Xresources'
  },
  'vim-airline': {
    path: '~/.vim/bundle/vim-airline-themes/autoload/airline/themes/',
    ext: '.vim'
  },
  'vim': {
    path: '~/.vim/colors/',
    ext: '.vim'
  }
}

const brightness = 'dark'

export { apps, brightness }
