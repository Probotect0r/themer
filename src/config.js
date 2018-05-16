const {
	vim,
	rxvtUnicode,
	i3,
	i3Status,
	i3Bar,
	rofi,
	neovim,
	xfce,
	polybar,
	termite,
	xfce4Terminal,
    awesome
} = require('./themers/')

const appsConf = {
	'vim': {
		file: `${process.env.HOME}/.vimrc`,
		themer: vim
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
	'neovim': {
		file: `${process.env.HOME}/.config/nvim/init.vim`,
		themer: neovim
	},
	'polybar': {
		file: `${process.env.HOME}/.config/polybar/colors`,
		themer: polybar
	},
	'termite': {
		file: `${process.env.HOME}/.config/termite/config`,
		themer: termite
	},
	'xfce4-terminal': {
		file: `${process.env.HOME}/.config/xfce4/terminal/terminalrc`,
		themer: xfce4Terminal
	},
	'awesome': {
        file: `${process.env.HOME}/.config/awesome/theme.lua`,
        themer: awesome
	}
}

// CHANGE THIS TO CHANGE THE APPLICATIONS THAT GET UPDATED //
// The values have to be one of the keys from the appsConf object
// Put i3 after all other i3 related apps, as the i3 themer also restarts i3
// Put xfce after all other ones that might affect it like gtk
const apps = ['rofi', 'neovim', 'xfce4-terminal', 'awesome']

// Only 'dark' supported for now
const brightness = 'dark'

module.exports =  { apps, brightness, appsConf }
