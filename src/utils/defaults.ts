type Application = {
    name: string;
    icon: string;
    type: string;
    id: string;
    window: {
        title: string;
    };
}

const apps: {
    [key: string]: Application;
} = {
    "Settings": {
        "name": "Settings",
        "icon": "settings",
        "type": "app",
        "id": "Settings",
        "window": {
            "title": "Settings",
        }
    },
    "FileExplorer": {
        "name": "File Explorer",
        "icon": "explorer",
        "type": "app",
        "id": "FileExplorer",
        "window": {
            "title": "File Explorer",
        }
    },
    "Browser": {
        "name": "Browser",
        "icon": "brave",
        "type": "app",
        "id": "Browser",
        "window": {
            "title": "Browser",
        },
    },
    "VisualStudioCode": {
        "name": "Visual Studio Code",
        "icon": "vscode",
        "type": "app",
        "id": "VisualStudioCode",
        "window": {
            "title": "Visual Studio Code",
        },
    },
    "Terminal": {
        "name": "Terminal",
        "icon": "terminal",
        "type": "app",
        "id": "Terminal",
        "window": {
            "title": "Terminal",
        },
    },
    "Calculator": {
        "name": "Calculator",
        "icon": "calculator",
        "type": "app",
        "id": "Calculator",
        "window": {
            "title": "Calculator",
        },
    },
    "Github": {
        "name": "Github",
        "icon": "github",
        "type": "app",
        "id": "Github",
        "window": {
            "title": "Github",
        },
    },
    "LeagueOfLegends": {
        "name": "League of Legends",
        "icon": "leagueoflegends",
        "type": "app",
        "id": "LeagueOfLegends",
        "window": {
            "title": "League of Legends",
        },
    },
    "Discord": {
        "name": "Discord",
        "icon": "discord",
        "type": "app",
        "id": "Discord",
        "window": {
            "title": "Discord",
        },
    },
}

var { taskbarApps, desktopApps } = {
    taskbarApps: [
        apps.Browser,
        apps.Discord,
        apps.Github,
        apps.LeagueOfLegends,
        apps.FileExplorer,
        apps.VisualStudioCode,
        apps.Terminal,
    ],
    desktopApps: [
        apps.Browser,
        apps.Discord,
        apps.Github,
        apps.LeagueOfLegends,
        apps.FileExplorer,
        apps.VisualStudioCode,
        apps.Terminal,
        apps.Calculator,
        apps.Calculator,
        apps.Calculator,
    ]   
}

export { apps, taskbarApps, desktopApps };