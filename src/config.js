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
	gtk3,
	xfce,
	polybar,
	termite,
	xfce4Terminal
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
	}
}

// CHANGE THIS TO CHANGE THE APPLICATIONS THAT GET UPDATED //
// The values have to be one of the keys from the appsConf object
// Put i3 after all other i3 related apps, as the i3 themer also restarts i3
// Put xfce after all other ones that might affect it like gtk
const apps = ['rofi', 'neovim', 'polybar', 'xfce4-terminal']

// Only 'dark' supported for now
const brightness = 'dark'

module.exports =  { apps, brightness, appsConf }
