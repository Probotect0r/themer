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

  ```
  # Install dependencies
  npm i
  # Run script with dkeg colors
  npm start dkeg
  # Run script with base16 colors
  npm start base16
  # Run script with specifc dkeg scheme
  npm start dkeg paints
  # Run script with specifc base16 scheme
  npm start base16 google
  ```
To change the collection of applications that get updated, you can change the `apps` array in the src/config.js file.

Keep in mind that the base16 colors have a specific [style guide](https://github.com/chriskempson/base16/blob/master/styling.md) and all the schemes generated follow that. 
On the other hand, the dkeg colors do not have a any such style guide and therefore the schemes generated for certain applications might be opinionated, as they were chosen 
based on what I liked.

Feel free to change up the schemes for the dkeg colors to what you like. To change them, just edit the corresponding template. For example, the `generic.vim` template defines
syntax highlighting for vim by referencing terminal colors as chosen by me. You can to change it to highlight differently. For any questions on how to change templates, you can 
refer to the specific application's documentation.

### To-Do

* Add support for more applications (Rofi)
* Add more schemes by grabbing schemes from Xcolors.net, and randomly generated HUSL colors from [ terminal.sexy ](terminal.sexy) (Use B16B to build them? Their color layout is different then b16)

### Contributing

Feel free to submit a pull request.

### Attributions

* This was originally forked from the amazing [base16-builder](https://github.com/base16-builder/base16-builder) so all credit goes
it's contributors for the code, schemes and templates.
* All the schemes in the dkeg folder are taken from their original repo [crayolo](https://github.com/dkeg/crayolo) and all credit goes
to their creator dkeg. The script `convertToYaml.js` was used to convert all of them to yaml format. Thanks a lot dkeg!
