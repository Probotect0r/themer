import * as fs from 'fs'
import * as ini from 'ini'

export class ConfigLoader {
    configFolderPath: string
    static readonly defaultConfigFolderPath: string = '~/.config/themer/'
    
    constructor() {
        this.loadConfigFolderPath()
        this.loadConfigFile()
    }

    private loadConfigFolderPath() {
        this.configFolderPath = process.env.XDG_CONFIG_HOME ?
            this.getPathFromEnvVar(process.env.XDG_CONFIG_HOME)
            : ConfigLoader.defaultConfigFolderPath
    }

    private getPathFromEnvVar(configFolderPath: string) {
        if(configFolderPath.substring(configFolderPath.length - 1) != '/') {
            configFolderPath = `${configFolderPath}/`
        }

        return `${configFolderPath}themer/`
    }

    private loadConfigFile() {}

    get configFilePath() {
        return `${this.configFolderPath}config`
    }
}
