import { useState, useEffect } from "react";

export const LazyComponent = ({ show, children }: {
    show: boolean;
    children: React.ReactNode;
}) => {
    const [loaded, setLoad] = useState(false);

    useEffect(() => {
        if (show && !loaded) setLoad(true);
    }, [show, loaded]);

    return show || loaded ? <>{children}</> : null;
};