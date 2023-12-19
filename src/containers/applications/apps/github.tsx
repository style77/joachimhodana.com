import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../reducers";

const GITHUB_URL = "https://github.com/style77"

export const Github = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "Github");

    const dispatch = useDispatch()

    useEffect(() => {
        if (!wnapp) {
            return;
        }

        window.open(GITHUB_URL, "_blank")

        dispatch({
            type: "CLOSE_APPLICATION",
            payload: wnapp.id
        })
    }, [dispatch, wnapp])

}