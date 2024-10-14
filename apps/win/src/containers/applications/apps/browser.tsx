import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../../utils/icon";
import { LazyComponent } from "../../../utils/lazy";
import { ToolBar } from "../toolbar";
import { RootState } from "../../../reducers";

type URL = {
    protocol: string;
    host: string;
    path?: string;
};

type Bookmark = {
    name: string;
} & URL;

const HOME_URL = {
    protocol: "https",
    host: "www.google.com",
    path: "webhp?igu=1",
};

export const Browser = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "Browser");

    const [url, setUrl] = useState<URL>(HOME_URL);
    const [isTyping, setTyping] = useState(false);
    const [history, setHistory] = useState<URL[]>([HOME_URL]);

    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    const searchRef = useRef<HTMLInputElement | null>(null)

    const dispatch = useDispatch();

    if (!wnapp) {
        return null;
    }

    const bookmarks: Bookmark[] = [
        {
            name: "Google",
            protocol: "https",
            host: "www.google.com",
            path: "webhp?igu=1",
        },
        {
            name: "ChatGPT",
            protocol: "https",
            host: "chat.openai.com",
        },
        {
            name: "Trendaptive",
            protocol: "http",
            host: "trendaptive.com",
        },
        {
            name: "Code Nerds",
            protocol: "https",
            host: "codenerds.tech",
        },
        {
            name: "Joachim Hodana",
            protocol: "https",
            host: "joachimhodana.com",
        },
        {
            name: "Dealscan",
            protocol: "https",
            host: "dealscan.joachimhodana.com",
        }
    ]

    const isValidURL = (string: string) => {
        const res = string.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g,
        );
        return res !== null;
    };

    const getValidUrl = (url: string) => {
        if (isValidURL(url)) {
            if (!url.startsWith("http")) {
                url = "https://" + url;
            }
        } else {
            url = `https://www.google.com/search?q=${url}&igu=1`;
        }

        const protocol = url.split("://")[0];
        const host = url.split("://")[1].split("/")[0];
        const path = url.split("://")[1].split("/")[1];

        return {
            protocol,
            host,
            path
        };
    };

    const combineUrl = (url: URL) => {
        return `${url.protocol}://${url.host}/${url.path || ""}`;
    };

    const search = (url: URL) => {
        setUrl(url);
        searchRef.current!.value = combineUrl(url);
        if (iframeRef.current) {
            iframeRef.current.src = `${url.protocol}://${url.host}/${url.path}`;
            setHistory([...history, url]);
        }

        setTyping(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            search(url);
        }
    };

    return (
        <div
            className="edgeBrowser floatTab dpShad"
            data-size={wnapp.window.size}
            data-max={wnapp.window.max}
            id={wnapp.icon + "App"}
        >
            <ToolBar
                app={wnapp}
                icon={wnapp.icon}
                size={wnapp.window.size}
                name="Browser"
                float
            />
            <div className="windowScreen flex flex-col">
                <div className="overTool flex">
                    <div className="btab">
                        <div>New Tab</div>
                        <Icon
                            fafa="faTimes"
                            clicked={true}
                            width={10}
                            onClick={() => dispatch({ type: "CLOSE_APPLICATION", payload: wnapp.id })}
                            className="hover:bg-gray-200/25 rounded-full transition duration-200 ease-in-out p-0.5"
                        />
                    </div>
                </div>
                <div className="restWindow flex-grow flex flex-col">
                    <div className="addressBar w-full h-10 flex items-center">
                        <Icon
                            className="edgenavicon mx-2"
                            src="left"
                            width={14}
                            ui
                        />
                        <Icon
                            className="edgenavicon mx-2"
                            src="right"
                            width={14}
                            ui
                        />
                        <Icon
                            className="mx-2"
                            fafa="faRedo"
                            width={14}
                        />
                        <Icon
                            className="mx-4"
                            fafa="faHome"
                            width={18}
                        />
                        <div className="addCont relative flex items-center">
                            
                            <Icon className="absolute left-3" src="google" width={13} ui />
                            <input
                                className="w-full h-6 px-8 text-sm justify-center searchBar"
                                onKeyDown={handleKeyDown}
                                onChange={(e) => { setUrl(getValidUrl(e.target.value)); !isTyping && setTyping(true) }}
                                ref={searchRef}
                                placeholder="Search Google or type a URL"
                                type="text"
                            />
                            <div className="absolute right-0 flex justify-center mr-0.5">
                                <Icon
                                    className="hover:bg-gray-200/25 rounded-md transition duration-200 ease-in-out p-0.5 px-3"
                                    src="brave"
                                    ui
                                    width={14}
                                />
                                <Icon
                                    className="pt-1 hover:bg-gray-200/25 rounded-md transition duration-200 ease-in-out p-0.5 px-2"
                                    src="BAT"
                                    ui
                                    width={20}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full bookbar py-2">
                        <div className="flex">
                            {bookmarks.map((mark, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex handcr items-center ml-2 mr-1 prtclk"
                                        onClick={() => {
                                            search(mark as URL);
                                        }}
                                        data-url={mark}
                                    >
                                        <Icon
                                            className="mr-1"
                                            ext
                                            width={16}
                                            src={new URL(combineUrl(mark as URL)).origin + "/favicon.ico"}
                                        />
                                        <div className="text-xs">{mark.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="siteFrame flex-grow overflow-hidden">
                        <LazyComponent show={true}>
                            <iframe
                                src={!isTyping ? combineUrl(url) : combineUrl(history[history.length - 1])}
                                ref={iframeRef}
                                id="isite"
                                frameBorder="0"
                                className="w-full h-full"
                                title="site"
                            ></iframe>
                        </LazyComponent>
                    </div>
                </div>
            </div>
        </div>
    );
};