export type Application = {
    name: string;
    icon: string;
    type: string;
    id: string;
    window: {
        title: string;
        size?: string;
        max?: boolean
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
    "Notepad": {
        "name": "Notepad",
        "icon": "notepad",
        "type": "app",
        "id": "Notepad",
        "window": {
            "title": "Notepad",
        },
    },
    "Mullvad": {
        "name": "Mullvad",
        "icon": "mullvad",
        "type": "app",
        "id": "Mullvad",
        "window": {
            "title": "Mullvad",
        },
    },
    "PDFViewer": {
        "name": "PDF Viewer",
        "icon": "pdf",
        "type": "app",
        "id": "PDFViewer",
        "window": {
            "title": "PDF Viewer",
        },
    },
}

export type File = {
    type: "file";
    fileType: "image" | "text" | "pdf";
    content: string;
} & Application;

const files: {
    [key: string]: File;
} = {
    "Interviewer": {
        "name": "for interviewer.txt",
        "icon": "notepad",
        "type": "file",
        "id": "Notepad",
        "window": {
            "title": "for interviewer.txt",
        },
        "fileType": "text",
        "content": `
Checkout my CV, it's on desktop in \`CV.pdf\` file.\n
If you want to see my code, double click on the Github icon to open my Github profile, or open Visual Studio Code (here in simulator), and review code for few projects that are scraped from my Github.


If you want to see my projects in action, open Browser and just choose project from bookmarks (these are demo version with demo credentials provided).




contact: me@joachimhodana.com`,
    },
    "CV": {
        "name": "CV.pdf",
        "icon": "pdf",
        "type": "file",
        "id": "PDFViewer",
        "window": {
            "title": "CV.pdf",
        },
        "fileType": "pdf",
        "content": "https://joachimhodana.com/CV.pdf",
    },
}

const appsAndFiles = {
    ...apps,
    ...files,
};

const { taskbarApps, desktopApps } = {
    taskbarApps: [
        apps.Browser,
        apps.Discord,
        apps.Github,
        apps.LeagueOfLegends,
        apps.VisualStudioCode,
        apps.Terminal,
    ],
    desktopApps: [
        apps.Browser,
        apps.Discord,
        apps.Github,
        apps.LeagueOfLegends,
        apps.VisualStudioCode,
        apps.Terminal,
        apps.Calculator,
        files.Interviewer,
        files.CV,
    ]
}

export { appsAndFiles, taskbarApps, desktopApps };