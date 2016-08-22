## Automatic theme changer for Linux applications

This app will change the theme for a collection of linux applications to a randomly chosen base16 theme.

It uses the base16-builder to select a theme and generate the theme files, then applies those files to the system. It does
not override any existing config files, but instead edits them carefully so you don't lose your other settings.

Currently the following applications are supported (more to come):
* Vim
* Vim-airline
* rxvt_unicode (.Xresources)
* i3wm
* i3status

### Running

Run `npm i` to install the packages. Then run `npm run start` to run the script. The scheme name will be output in the console.

### To-Do

* Add support for more applications (i3status)
* Add the ability to specify a list of themes which are to be avoided.
* Add more schemes by grabbing schemes from Xcolors.net, and randomly generated HUSL colors from [ terminal.sexy ](terminal.sexy) (Use B16B to build them? Their color layout is different then b16)

### Running

Run `npm i` to install the packages. Then run `npm run start` to run the script. The scheme name will be output in the console, as well as the applications which were updated..

### To-Do

* Add support for more applications (GTK, Rofi)
* Add the ability to specify a list of themes which are to be avoided.
* Add more schemes by grabbing schemes from Xcolors.net (Their color layout is different then b16)

### Contributing

Feel free to submit a pull request.

### Attributions

* This was originally forked from the amazing [base16-builder](https://github.com/base16-builder/base16-builder) so all credit goes
it's contributors for the code, schemes and templates.
