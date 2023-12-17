const apps = {
    "Settings": {
        "name": "Settings",
        "icon": "settings",
        "type": "app",
        "id": "settings",
        "window": {
            "title": "Settings",
        }
    },
    "Search": {
        "name": "Search",
        "icon": "search",
        "type": "search",
        "id": "search",
        "window": {
            "title": "Search",
        }
    },
    "FileExplorer": {
        "name": "File Explorer",
        "icon": "explorer",
        "type": "app",
        "id": "file-explorer",
        "window": {
            "title": "File Explorer",
        }
    },
    "Browser": {
        "name": "Browser",
        "icon": "brave",
        "type": "app",
        "id": "browser",
        "window": {
            "title": "Browser",
        },
    },
    "VisualStudioCode": {
        "name": "Visual Studio Code",
        "icon": "vscode",
        "type": "app",
        "id": "vscode",
        "window": {
            "title": "Visual Studio Code",
        },
    },
    "Terminal": {
        "name": "Terminal",
        "icon": "terminal",
        "type": "app",
        "id": "terminal",
        "window": {
            "title": "Terminal",
        },
    },
    "Calculator": {
        "name": "Calculator",
        "icon": "calculator",
        "type": "app",
        "id": "calculator",
        "window": {
            "title": "Calculator",
        },
    },
    "Github": {
        "name": "Github",
        "icon": "github",
        "type": "app",
        "id": "github",
        "window": {
            "title": "Github",
        },
    },
    "LeagueOfLegends": {
        "name": "League of Legends",
        "icon": "leagueoflegends",
        "type": "app",
        "id": "leagueoflegends",
        "window": {
            "title": "League of Legends",
        },
    },
    "Discord": {
        "name": "Discord",
        "icon": "discord",
        "type": "app",
        "id": "discord",
        "window": {
            "title": "Discord",
        },
    },
}

var { taskbarApps, desktopApps } = {
    taskbarApps: [
        apps.Search,
        apps.Browser,
        apps.Discord,
        apps.Github,
        apps.LeagueOfLegends,
        apps.FileExplorer,
        apps.VisualStudioCode,
        apps.Terminal,
    ],
    desktopApps: [
    ]   
}

export { apps, taskbarApps, desktopApps };