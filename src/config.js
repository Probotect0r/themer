const {
	vim,
	vimAirline,
	rxvtUnicode,
	i3,
	i3Status,
	i3Bar,
	rofi,
	lemonbar,
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
		file: `${process.env.HOME}/.config/i3status/config`, themer: i3Status
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
	}
}

// CHANGE THIS TO CHANGE THE APPLICATIONS THAT GET UPDATED //
const apps = ['rofi', 'rxvt-unicode', 'i3bar', 'i3status', 'i3']

// Only 'dark' supported for now
// Put i3 after all other i3 related apps, as the i3 themer also restarts i3
const brightness = 'dark'

module.exports =  { apps, brightness, appsConf }
