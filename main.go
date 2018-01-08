package main

import (
	"fmt"
	"os"

	"github.com/go-ini/ini"
)

func main() {
	// 1. Load the config file
	homePath := os.Getenv("HOME")
	configFilePath := homePath + "/.themerc"

	fmt.Println(configFilePath)
	config, err := ini.LoadSources(ini.LoadOptions{AllowBooleanKeys: true}, configFilePath)
	if err != nil {
		panic(err)
	}

	getApplicationList(config)

}

func getApplicationList(config *ini.File) {
	applicationsSection, err := config.GetSection("applications")

	if err != nil {
		panic(err)
	}

	applications := applicationsSection.KeyStrings()

	for _, val := range applications {
		fmt.Println(key, val)
	}

}
