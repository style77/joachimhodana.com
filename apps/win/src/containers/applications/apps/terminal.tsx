import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import dirs from "./assets/dir.json";
import { RootState } from "../../../reducers";
import { ToolBar } from "../toolbar";

type IPData = {
    ip: string;
    network: string;
    city: string;
    region: string;
    org: string;
    postal: string;
}

const HELP = [
    "CD             Displays the name of or changes the current directory.",
    "CAT            Displays the contents of a file.",
    "CLS            Clears the screen.",
    "COLOR		    Sets the default console foreground and background colors.",
    "DATE           Displays or sets the date.",
    "DIR            Displays a list of files and subdirectories in a directory.",
    "ECHO           Displays messages, or turns command echoing on or off.",
    "EXIT           Quits the CMD.EXE program (command interpreter).",
    "HELP           Provides Help information for Windows commands.",
    "IPCONFIG       Displays all current TCP/IP network configuration values.",
    "SYSTEMINFO     Displays machine specific properties and configuration.",
    "TIME           Displays or sets the system time.",
    "VER            Displays the Windows version.",
];

const COLOR_INFO = [
    "Sets the default console foreground and background colors.",
    "",
    "COLOR [attr]",
    "  attr        Specifies color attribute of console output",
    "",
    "Color attributes are specified by TWO hex digits -- the first",
    "corresponds to the background; the second the foreground. Each digit",
    "can be any of the following values:",
    "",
    "    0 = Black       8 = Gray",
    "    1 = Blue        9 = Light Blue",
    "    2 = Green       A = Light Green",
    "    3 = Cyan        B = Light Cyan",
    "    4 = Red         C = Light Red",
    "    5 = Magenta     D = Light Magenta",
    "    6 = Brown       E = Yellow",
    "    7 = Light Gray  F = White",
    "",
    "If no argument is given, this command restores the color to what it was",
    "when CMD.EXE started. This value either comes from the current console",
    "window, the /T command line switch or from the DefaultColor registry",
    "value."
];

const DEVICE_INFO = [
    "Host Name:                 BLUE",
    "OS Name:                   Win11React Dummys Edition",
    "OS Version:                10.0.22000 N/A Build 22000.51",
    "OS Manufacturer:           ",
    "OS Configuration:          Standalone Workstation",
    "OS Build Type:             Multiprocessor Free",
    "Registered Owner:          Blue",
    "Registered Organization:   N/A",
    "Product ID:                7H1S1-5AP1R-473DV-3R5I0N",
]

export const Terminal = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "Terminal");

    const [stack, setStack] = useState(["OS [Version 10.0.22000.51]", ""]);
    const [pwd, setPwd] = useState("C:\\Users\\Style");
    const [lastCmd, setLsc] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        getIPDetails();
    });

    if (!wnapp) {
        return null;
    }

    const IpDetails: IPData[] = [];
    const getIPDetails = async () => {
        try {
            const response = await fetch("https://ipapi.co/json")
            const data = await response.json() as IPData;
            IpDetails.push(data);
        } catch (error) {
            console.log(error);
            IpDetails.push({
                ip: "__network_error",
                network: "__kindly check internet connection",
                city: "",
                region: "",
                org: "",
                postal: "",
            });
        }
    };

    const dirFolders = (isFile = "") => {
        let tdir: {
            [key: string]: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
        } = { ...dirs }

        const curr = pwd == "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");

        if (pwd != "C:\\") {
            for (let i = 0; i < curr.length; i++) {
                tdir = tdir[curr[i]];
            }
        }

        if (isFile == "") {
            return Object.keys(tdir);
        } else {
            return tdir[isFile] || {};
        }
    };

    function getRandomSerialNumber() {
        return Math.floor(Math.random() * 10000).toString(16).toUpperCase().padStart(4, '0');
    }

    function getRandomDate() {
        const start = new Date(1970, 1, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return randomDate.toLocaleString(undefined, options);
    }

    const cmdTool = async (cmd: string) => {
        const tmpStack = [...stack];
        tmpStack.push(`${pwd}>${cmd}`);
        const arr = cmd.split(" ");
        const type = arr[0].trim().toLowerCase();
        let arg = arr.slice(1, arr.length).join(" ").trim() || "";

        switch (type) {
            case "echo":
                tmpStack.push(arg.length ? arg : "ECHO is on.");
                break;
            case "cd":
                arg = arg.toLowerCase();
                if (arg === ".") {
                    // Do nothing
                } else if (arg === "..") {
                    const curr = pwd === "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");
                    curr.pop();
                    setPwd(`C:\\${curr.join("\\")}`);
                } else if (!arg.includes(".")) {
                    const tdir = dirFolders();
                    const foundDir = tdir.find((folder: string) => folder.toLowerCase() === arg);
                    if (foundDir) {
                        const curr = pwd === "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");
                        curr.push(foundDir);
                        setPwd(`C:\\${curr.join("\\")}`);
                    } else {
                        tmpStack.push("The system cannot find the path specified.");
                    }
                } else {
                    tmpStack.push("The directory name is invalid.");
                }
                break;
            case "dir": {
                const tdir = dirFolders();
                tmpStack.push(` Volume in drive C is system`);
                tmpStack.push(` Volume Serial Number is ${getRandomSerialNumber()}`);
                tmpStack.push("")
                tmpStack.push(` Directory of ${pwd}`);
                tmpStack.push("")

                tdir.forEach((folder: string) => {
                    const date = getRandomDate().replace(",", "").split(" ");
                    let file_type;

                    if (!folder.includes(".")) {
                        file_type = "<DIR>"
                    } else {
                        file_type = ""
                    }

                    tmpStack.push(`${date[0]}  ${date[1]}    ${file_type === "<DIR>" ? file_type : file_type.padEnd(5)}  ${folder}`);
                });
                break;
            }
            case "glomb":
                tmpStack.push("https://github.com/th11n")
                break
            case "spioszek":
                tmpStack.push("Oliwier wstawaj do szkoły :D")
                break
            case "samedi":
                tmpStack.push("❤")
                break
            case "niepij":
                tmpStack.push("Kuba prosze nie pij")
                break
            case "cls":
                tmpStack.splice(0, tmpStack.length);
                break
            case "color": {
                let color = "#FFFFFF";
                let background = "#000000";
                const re = /^[A-Fa-f0-9]+$/g;
                if (arg && (arg.length < 3 && re.test(arg))) {
                    if (arg.length == 2) {
                        color = colorCode(arg[1]);
                        background = colorCode(arg[0]);
                    } else if (arg.length == 1) {
                        color = colorCode(arg[0]);
                    }

                    const cmdcont = document.getElementById("cmdcont");
                    if (!cmdcont) {
                        return;
                    }

                    cmdcont.style.backgroundColor = background;
                    cmdcont.style.color = color;
                } else {
                    tmpStack.push(...COLOR_INFO);
                }
                break;
            }
            case "date":
                tmpStack.push("The current date is: " + new Date().toLocaleDateString());
                break;
            case "time":
                tmpStack.push(
                    "The current time is: " +
                    new Date()
                        .toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })
                        .replace(":", ".") +
                    "." +
                    Math.floor(Math.random() * 100),
                );
                break;
            case "exit":
                tmpStack.splice(0, tmpStack.length);
                tmpStack.push("OS [Version 10.0.22000.51]", "");
                dispatch({ type: "CLOSE_APPLICATION", payload: wnapp.id });
                break;
            case "systeminfo":
                tmpStack.push(...DEVICE_INFO);
                break;
            case "help":
                tmpStack.push(...HELP);
                break;
            case "ipconfig": {
                const IP = IpDetails[0];
                tmpStack.push("Windows IP Configuration");
                tmpStack.push("");
                tmpStack.push("IPv6: " + IP.ip);
                tmpStack.push("Network: " + IP.network);
                tmpStack.push("City: " + IP.city);
                tmpStack.push("Network Org: " + IP.org);
                tmpStack.push("Region: " + IP.region);
                tmpStack.push("Postal: " + IP.postal);
                break;
            }
            case "ver":
                tmpStack.push("Microsoft Windows [Version 10.0.22000.51]");
                break;
            case "cat": {
                let errp = true;

                if (arg.includes(".")) {
                    const tdir = dirFolders();

                    for (let i = 0; i < tdir.length; i++) {
                        if (arg.toLowerCase() == tdir[i].toLowerCase() && errp) {
                            errp = false;
                            const file = dirFolders(tdir[i]);
                            let content = file.content || "";
                            content = content.split("\n");
                            for (let i = 0; i < content.length; i++) {
                                tmpStack.push(content[i]);
                            }
                            break;
                        }
                    }
                }

                if (errp) {
                    tmpStack.push(`cat: ${arg.toLowerCase()}: No such file or directory`);
                }
                break;
            }
            default:
                tmpStack.push(
                    `'${type}' is not recognized as an internal or external command,`,
                );
                tmpStack.push("operable program or batch file.");
                tmpStack.push("");
                tmpStack.push('Type "help" for available commands');
                break;
        }

        if (type.length > 0) tmpStack.push("");
        setStack(tmpStack);
    };

    const colorCode = (color: string) => {
        let code = "#000000";
        /*
                0: Black
                1: Blue
                2: Green
                3: Cyan
                4: Red
                5: Magenta
                6: Brown
                7: Light Gray
                8: Dark Gray
                9: Light Blue
                A: Light Green
                B: Light Cyan
                C: Light Red
                D: Light Magenta
                E: Yellow
                F: White
            */

        switch (color.toUpperCase()) {
            case "0":
                code = "#000000";
                break;
            case "1":
                code = "#0000AA";
                break;
            case "2":
                code = "#00AA00";
                break;
            case "3":
                code = "#00AAAA";
                break;
            case "4":
                code = "#AA0000";
                break;
            case "5":
                code = "#AA00AA";
                break;
            case "6":
                code = "#AA5500";
                break;
            case "7":
                code = "#AAAAAA";
                break;
            case "8":
                code = "#555555";
                break;
            case "9":
                code = "#5555FF";
                break;
            case "A":
                code = "#55FF55";
                break;
            case "B":
                code = "#55FFFF";
                break;
            case "C":
                code = "#FF5555";
                break;
            case "D":
                code = "#FF55FF";
                break;
            case "E":
                code = "#FFFF55";
                break;
            case "F":
                code = "#FFFFFF";
                break;
        }

        return code;
    };

    const action = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const cmdline = document.getElementById("curcmd");
        const actionType = target.dataset.action;

        if (cmdline && actionType) {
            event = event as React.KeyboardEvent<HTMLDivElement>
            const key = event.key;

            const isEnterKey = key === "Enter";
            const isArrowKey = key === "ArrowUp" || key === "ArrowDown";
            const isTabKey = key === "Tab";

            if (actionType === "hover") {
                const crline = cmdline.parentNode;
                const cmdcont = document.getElementById("cmdcont");

                if (crline && cmdcont) {
                    cmdcont.scrollTop = (crline as HTMLElement).offsetTop;
                }
                cmdline.focus();
            } else if (actionType === "enter") {
                if (isEnterKey) {
                    event.preventDefault();
                    const tmpStack = [...stack];
                    const cmd = target.innerText.trim();
                    target.innerText = "";
                    setLsc(tmpStack.length + 1);
                    cmdTool(cmd);
                } else if (isArrowKey) {
                    event.preventDefault();
                    let i = lastCmd + (event.key === "ArrowUp" ? -1 : 1);

                    while (i >= 0 && i < stack.length) {
                        if (stack[i].startsWith("C:\\") && stack[i].includes(">")) {
                            const tp = stack[i].split(">");
                            target.innerText = tp[1] || "";
                            setLsc(i);
                            break;
                        }
                        i += event.key === "ArrowUp" ? -1 : 1;
                    }
                    cmdline.focus();
                } else if (isTabKey) {
                    event.preventDefault();
                    const cmd = target.innerText.trim();
                    const arr = cmd.split(" ");
                    const arg = arr.slice(1).join(" ");

                    const tdir = dirFolders();
                    for (let i = 0; i < tdir.length; i++) {
                        if (arg.length && tdir[i].toLowerCase().startsWith(arg.toLowerCase())) {
                            target.innerText = arr[0] + " " + tdir[i];
                            break;
                        }
                    }
                }
                cmdline.focus();
            }
        }
    };

    return (
        <div
            className="wnterm floatTab dpShad"
            data-size={wnapp.window.size}
            data-max={wnapp.window.max}
            id={wnapp.icon + "App"}
        >
            <ToolBar
                app={wnapp}
                icon={wnapp.icon}
                size={wnapp.window.size}
                name={wnapp.window.title}
                invert
                bg="#060606"
            />
            <div className="windowScreen flex" data-dock="true">
                <div className="restWindow h-full flex-grow text-gray-100">
                    <div
                        className="cmdcont w-full box-border overflow-y-scroll win11Scroll prtclk"
                        id="cmdcont"
                        onMouseOver={action}
                        onClick={action}
                        data-action="hover"
                    >
                        <div className="w-full h-max pb-12">
                            {stack.map((x, i) => (
                                <pre key={i} className="cmdLine">
                                    {x}
                                </pre>
                            ))}
                            <div className="cmdLine actmd">
                                {pwd}&gt;
                                <div
                                    className="ipcmd"
                                    id="curcmd"
                                    contentEditable
                                    data-action="enter"
                                    onKeyDown={action}
                                    spellCheck="false"
                                ></div>
                                {/* <input id="curcmd" className="ipcmd" type="text" defaultValue="tyler"/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};