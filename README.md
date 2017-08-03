# Linux Themer

![](http://imgur.com/zLJu0ik.png)
This program will automatically apply a color scheme to a collection of programs that you specify. The goal is to make it very easy to rice 
your system. It edits the config files for each application you specify, and only modifies the necessary color settings.

##Running
1. Clone this repository.
2. Make sure you have at least node `v7.6.0` installed. If you are using `NVM`, make sure you are using that version.
3. Configure which applications you want riced by editing the `apps` array in `src/config.js`. See the comments in that file for more information.
4. run `node src/index.js <color scheme>`, where `<color scheme>` is the name of any file from `db/schemes/` folder without the `.yml` extension.
If you don't specify a scheme, a random one will be picked.
5. Post to `r/unixporn` and bring in that sweet karma!
