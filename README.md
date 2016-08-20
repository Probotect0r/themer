## Automatic theme changer for Linux applications

This app will change the theme for a collection of linux applications to a randomly chosen base16 theme.

It uses the base16-builder to select a theme and generate the theme files, then applies those files to the system. It does
not override any existing config files, but instead edits them carefully so you don't lose your other settings.

Currently the following applications are supported (more to come):
* Vim
* Vim-airline
* rxvt_unicode (.Xresources)
* i3wm
<<<<<<< a6df3cbc4478fcd41253cc80e5bcf23873e6bbf0

### Running

Run `npm i` to install the packages. Then run `npm run start` to run the script. The scheme name will be output in the console.

### To-Do

* Add support for more applications (i3status)
* Add the ability to specify a list of themes which are to be avoided.
* Add more schemes by grabbing schemes from Xcolors.net (Use B16B to build them? Their color layout is different then b16)
=======
* i3status

### Running

Run `npm i` to install the packages. Then run `npm run start` to run the script. The scheme name will be output in the console, as well as the applications which were updated..

### To-Do

* Add support for more applications (GTK)
* Add the ability to specify a list of themes which are to be avoided.
* Add more schemes by grabbing schemes from Xcolors.net (Their color layout is different then b16)
>>>>>>> Initial commit after fork.

### Contributing

Feel free to submit a pull request.

### Attributions
<<<<<<< a6df3cbc4478fcd41253cc80e5bcf23873e6bbf0
* The amazing [base16-builder](https://github.com/base16-builder/base16-builder). This project uses it to generate theme templates.
=======

* This was originally forked from the amazing [base16-builder](https://github.com/base16-builder/base16-builder) so all credit goes
it's contributors for the code, schemes and templates.
>>>>>>> Initial commit after fork.
