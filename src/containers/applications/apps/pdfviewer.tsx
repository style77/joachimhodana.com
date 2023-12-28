import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../reducers";

const CV_URL = "/CV.pdf"

export const PDFViewer = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "PDFViewer");

    const dispatch = useDispatch()

    useEffect(() => {
        if (!wnapp) {
            return;
        }

        window.open(CV_URL, "_blank")

        dispatch({
            type: "CLOSE_APPLICATION",
            payload: wnapp.id
        })
    }, [dispatch, wnapp])

}