import { useSelector } from "react-redux"
import { RootState } from "../../../reducers";
import "./visualstudiocode.scss"
import { ToolBar } from "../toolbar";
import { Icon } from "../../../utils/icon";
import { useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import reposData from './assets/repos.json';

interface DirectoryItem {
    name: string;
    type: string;
    children?: DirectoryItem[];
    content?: string;
}

const extToLanguage = (ext: string[]) => {
    const extension: string = ext[ext.length - 1];
    switch (extension) {
        case 'js':
            return 'javascript';
        case 'ts':
            return 'typescript';
        case 'tsx':
            return 'tsx';
        case 'jsx':
            return 'jsx';
        case 'py':
            return 'python';
        case 'md':
            return 'markdown';
        case 'html':
            return 'html';
        case 'css':
            return 'css';
        case 'scss':
            return 'scss';
        case 'yml':
            return 'yaml';
        case 'yaml':
            return 'yaml';
        case 'sh':
            return 'bash';
        case 'go':
            return 'go';
        default:
            return 'text';
    }
}

export const VisualStudioCode = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "VisualStudioCode");

    const [expandedDirs, setExpandedDirs] = useState<{ [key: string]: boolean }>({});
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [directoryData, setDirectoryData] = useState<{ [key: string]: any }>({});

    const [selectedFile, setSelectedFile] = useState<DirectoryItem | null>(null);

    const handleToggleDir = (workspace: string) => {
        setExpandedDirs((prevExpanded) => ({
            ...prevExpanded,
            [workspace]: !prevExpanded[workspace],
        }));
    };

    useEffect(() => {
        setDirectoryData(reposData);
    }, []);

    const workspaces: string[] = [
        "joachimhodana.com",
        "newsltr",
        "dealscan",
        "streamx",
        "insightguard",
        "quantex",
        "darkangel"
    ]

    if (!wnapp) {
        return null;
    }

    const renderDirectory = (items: DirectoryItem[], basePath: string, pl: number = 8) => {
        return (
            <ul>
                {items.map((item: DirectoryItem, index: number) => (
                    <li key={index} className="cursor-pointer" style={{
                        paddingLeft: `${pl}px`,
                    }} onClick={() => item.type !== 'dir' && item && setSelectedFile(item)}>
                        {item.type === 'dir' ? (
                            <div className="flex flex-col">
                                <div onClick={() => handleToggleDir(`${basePath}/${item.name}`)} className="flex flex-row gap-1 cursor-pointer explorerItemText">
                                    <Icon
                                        className="font-thin explorerItemText"
                                        fafa={`${expandedDirs[`${basePath}/${item.name}`] ? "faChevronDown" : "faChevronRight"}`}
                                        width={10}
                                    />
                                    <div className="explorerItemText text-sm font-thin text-ellipsis">{item.name}</div>
                                </div>
                                {expandedDirs[`${basePath}/${item.name}`] && (
                                    renderDirectory(item.children || [], `${basePath}/${item.name}`, pl + 2)
                                )}
                            </div>
                        ) : (
                            <div className="explorerItemText text-sm font-thin text-ellipsis">{item.name}</div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div
            className="vsc floatTab dpShad"
            data-size={wnapp.window.size}
            data-max={wnapp.window.max}
            id={wnapp.icon + "App"}
        >
            <ToolBar
                app={wnapp}
                icon={wnapp.icon}
                size={wnapp.window.size}
                name=""
            />
            <div className="windowScreen flex flex-row">
                <div className="overTool flex ml-9 mt-0.5 text-xs z-10">
                    <div className="px-2 py-1 vsc-toolbar-text">File</div>
                    <div className="px-2 py-1 vsc-toolbar-text">Edit</div>
                    <div className="px-2 py-1 vsc-toolbar-text">Selection</div>
                    <div className="px-2 py-1 vsc-toolbar-text">View</div>
                    <div className="px-2 py-1 vsc-toolbar-text">Go</div>
                    <div className="px-2 py-1 vsc-toolbar-text">Run</div>
                    <div className="px-2 py-1 vsc-toolbar-text">Terminal</div>
                    <div className="px-2 py-1 vsc-toolbar-text">Help</div>
                </div>
                <div className="sidebar flex flex-col items-center w-[40px] mt-2">
                    <div className="sidebarItem flex flex-col gap-2 items-center justify-center">
                        <div className="sidebarIcon border-l-[3px] hover:border-gray-300">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-white"
                                allIcons
                                src="files"
                                width={48}
                            />
                        </div>
                        <div className="sidebarIcon">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-gray-400 hover:fill-gray-50"
                                allIcons
                                src="searchVsc"
                                width={48}
                            />
                        </div>
                        <div className="sidebarIcon">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-gray-400 hover:fill-gray-50"
                                allIcons
                                src="sourceControl"
                                width={48}
                            />
                        </div>
                        <div className="sidebarIcon">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-gray-400 hover:fill-gray-50"
                                allIcons
                                src="debug"
                                width={48}
                            />
                        </div>
                        <div className="sidebarIcon">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-gray-400 hover:fill-gray-50"
                                allIcons
                                src="terminalVsc"
                                width={48}
                            />
                        </div>
                        <div className="sidebarIcon">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-gray-400 hover:fill-gray-50"
                                allIcons
                                src="extensions"
                                width={48}
                            />
                        </div>
                        <div className="sidebarIcon">
                            <Icon
                                className="px-2 py-2 cursor-pointer fill-gray-400 hover:fill-gray-50"
                                allIcons
                                src="settings"
                                width={48}
                            />
                        </div>
                    </div>
                </div>
                <div className="explorer flex flex-col min-w-[200px] max-w-[300px] mt-2 h-full overflow-y-auto border-r border-gray-400/25">
                    <div className="explorerHeader flex flex-col items-start justify-between px-2 py-1">
                        <div className="explorerHeaderTitle flex flex-row items-center justify-between w-full">
                            <div className="text-gray-300 uppercase text-xs ml-2">Explorer</div>
                            <Icon
                                className="cursor-pointer fill-gray-300 hover:bg-gray-300 hover:bg-opacity-10 rounded-md p-1"
                                allIcons
                                src="moreVsc"
                                width={16}
                            />
                        </div>
                        <div className="flex flex-col mt-2 w-full">
                            {workspaces.map((workspace) => (
                                <div key={workspace} className="workspaceItem flex flex-col">
                                    <div
                                        className="explorerItemHeader flex flex-row items-center gap-1 cursor-pointer py-1 border-b border-gray-400/25 w-full"
                                        onClick={() => handleToggleDir(workspace)}
                                    >
                                        <div className="cursor-pointer font-thin workspaceItemText">
                                            <Icon
                                                className="cursor-pointer font-thin workspaceItemText"
                                                fafa={`${expandedDirs[workspace] ? "faChevronDown" : "faChevronRight"}`}
                                                width={12}
                                            />
                                        </div>
                                        <div className="workspaceItemText text-xs uppercase font-semibold">{workspace}</div>
                                    </div>
                                    {expandedDirs[workspace] && (
                                        <div className="explorerContents">
                                            {renderDirectory(directoryData[workspace], workspace)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="editor flex flex-col mt-2 w-full h-full">
                    {
                        selectedFile && selectedFile.content ? (
                            <div className="flex flex-col w-full h-full">
                                <div className="editorHeader flex flex-row w-fit items-center px-3 py-1.5 cursor-pointer" onAuxClick={() => setSelectedFile(null)}>
                                    <span className="text-white text-xs font-thin">{selectedFile.name}</span>
                                    <Icon
                                        className="text-white hover:bg-gray-400/25 rounded-md p-0.5 ml-1"
                                        fafa="faClose"
                                        width={12}
                                        onClick={() => setSelectedFile(null)}
                                    />
                                </div>
                                <SyntaxHighlighter
                                    language={extToLanguage(selectedFile.name.split("."))}
                                    style={darcula}
                                    showLineNumbers={true}
                                    customStyle={{
                                        backgroundColor: "transparent",
                                        fontSize: "12px",
                                        lineHeight: "1.5",
                                        overflowX: "auto",
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                    {selectedFile.content}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <div className="w-full h-full justify-center items-center">
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <Icon
                                        ui
                                        src="vscode"
                                        width={128}
                                        className="mb-2"
                                    />
                                    <span className="text-2xl text-white">
                                        Welcome
                                    </span>
                                    {/* <Icon
                                        className="text-white"
                                        allIcons
                                        src="welcome"
                                        width={128}
                                    /> */}
                                    <span className="text-gray-300 text-md font-thin">Open a file to view code</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}