import { Grid } from "./Projects/Grid";

export default function Projects() {
    return (
        <div className="flex flex-col items-center justify-center w-full mt-14 gap-2">
            <h1 className="font-bold text-4xl relative after:absolute after:w-full after:border-t-[3px] after:border-t-red-500 after:h-2 after:rounded-[50%] after:left-0 after:bottom-[-14px] after:content-['']">Latest Work</h1>
            <Grid />
        </div>
    );
}