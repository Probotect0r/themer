const {
	vim,
	vimAirline,
	rxvtUnicode,
	i3,
	i3Status,
	i3Bar,
	rofi,
	lemonbar,
	neovim,
	gtk2,
	xfce
} = require('./themers/')

const appsConf = {
	'vim': {
		file: `${process.env.HOME}/.vimrc`,
		themer: vim
	},
	'vim-airline': {
		file: `${process.env.HOME}/.vimrc`,
		themer: vimAirline
	},
	'rxvt-unicode': {
		file: `${process.env.HOME}/.Xresources`,
		themer: rxvtUnicode,
	},
	'i3': {
		file: `${process.env.HOME}/.config/i3/config`,
		themer: i3
	},
	'i3status': {
		file: `${process.env.HOME}/.config/i3status/config`, 
		themer: i3Status
	},
	'i3bar': {
		file: `${process.env.HOME}/.config/i3/config`,
		themer: i3Bar
	},
	'rofi': {
		file: `${process.env.HOME}/.Xresources`,
		themer: rofi
	},
	'lemonbar': {
		file: `${process.env.HOME}/.config/admiral.d/config`,
		themer: lemonbar
	},
	'neovim': {
		file: `${process.env.HOME}/.config/nvim/init.vim`,
		themer: neovim
	},
	'gtk2': {
		file: ``,
		themer: gtk2
	},
	'xfce': {
		file: ``,
		themer: xfce
	}
}

// CHANGE THIS TO CHANGE THE APPLICATIONS THAT GET UPDATED //
// The values have to be one of the keys from the appsConf object
const apps = ['rofi', 'rxvt-unicode', 'vim', 'neovim', 'gtk2', 'xfce']

// Only 'dark' supported for now
// Put i3 after all other i3 related apps, as the i3 themer also restarts i3
const brightness = 'dark'

module.exports =  { apps, brightness, appsConf }
