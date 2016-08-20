import { vim, 
  vim_airline, 
  rxvt_unicode, 
  i3,
  i3status
} from './themer.js'

const appsConf = {
  'i3': {
    file: `${process.env.HOME}/.config/i3/config`,
    apply: i3
  },
  'rxvt-unicode': {
    file: `${process.env.HOME}/.Xresources`,
    apply: rxvt_unicode
  },
  'vim-airline': {
    file: `${process.env.HOME}/.vimrc`,
    apply: vim_airline
  },
  'vim': {
    file: `${process.env.HOME}/.vimrc`,
    apply: vim
  },
  'i3status': {
    file: `${process.env.HOME}/.config/i3status/config`,
    apply: i3status
  }
}

//const apps = ['i3', 'rxvt-unicode', 'vim-airline', 'vim']
const apps = ['i3', 'rxvt-unicode', 'vim-airline', 'vim', 'i3status']

const brightness = 'dark'

export { apps, brightness, appsConf }
