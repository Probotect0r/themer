/*
 * Author: Probotect0r
 * Description: Purpose of this project is to randomly generate a full theme for linux
 * environment based on a color shceme. 
 * This includes generating themes for multiple different applications and applying them.
 * The color schemes are mostly taken from /r/unixporn community.
 */

const theme = require('./themer.js')

theme()
    .catch(err => {
        console.log(err)
    })
