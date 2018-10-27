import {ConfigLoader} from './configLoader'
import {expect} from 'chai'


describe('ConfigLoader', () => {
    describe('loadConfigFolderPath', () => {
        it('should set config folder to ~/.config/themer/, when Env var not set', () => {
            let loader: ConfigLoader = new ConfigLoader()
            expect(loader.configFolderPath).to.equal(ConfigLoader.defaultConfigFolderPath)
        })

        it('should set config folder to value of Env var, when Env var set', () => {
            const mockPath: string = '~/.custom_config/' 
            process.env.XDG_CONFIG_HOME = mockPath

            let loader: ConfigLoader = new ConfigLoader()
            expect(loader.configFolderPath).to.equal(mockPath + 'themer/')

            delete process.env.XDG_CONFIG_HOME
        })

        it('should add slash to config folder path when missing', () => {
            const mockPath: string = '~/.custom_config' 
            process.env.XDG_CONFIG_HOME = mockPath

            let loader: ConfigLoader = new ConfigLoader()
            expect(loader.configFolderPath).to.equal(mockPath + '/themer/')
            delete process.env.XDG_CONFIG_HOME
        })
    })

    describe('get configFilePath', () => {
        it("should add 'config' to the config folder path", () => {
            let loader: ConfigLoader = new ConfigLoader()
            expect(loader.configFilePath).to.equal(ConfigLoader.defaultConfigFolderPath + 'config')
        })
    })
})
