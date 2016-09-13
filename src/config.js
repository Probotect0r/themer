import {
  base16Vim,
  dkegVim,

  base16VimAirline,
  dkegVimAirline,

  base16RxvtUnicode,
  dkegRxvtUnicode,

  base16I3,
  dkegI3,

  base16I3Status,
  dkegI3Status

} from './themers/'

const appsConf = {
  'vim': {
    file: `${process.env.HOME}/.vimrc`,
    base16: base16Vim,
    dkeg: dkegVim
  },
  'vim-airline': {
    file: `${process.env.HOME}/.vimrc`,
    base16: base16VimAirline,
    dkeg: dkegVimAirline
  },
  'rxvt-unicode': {
    file: `${process.env.HOME}/.Xresources`,
    base16: base16RxvtUnicode,
    dkeg: dkegRxvtUnicode
  },
  'i3': {
    file: `${process.env.HOME}/.config/i3/config`,
    base16: base16I3,
    dkeg: dkegI3
  },
  'i3status': {
    file: `${process.env.HOME}/.config/i3status/config`,
    base16: base16I3Status,
    dkeg: dkegI3Status
  }
}

// CHANGE THIS TO CHANGE THE APPLICATIONS THAT GET UPDATED //
const apps = ['rxvt-unicode', 'vim']

const brightness = 'dark'

export { apps, brightness, appsConf }
