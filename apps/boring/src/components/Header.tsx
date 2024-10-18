import { IoOpenOutline } from "react-icons/io5";

export default function Header() {
    return (
        <div className="flex flex-col items-center justify-center w-full mt-14 gap-2">
            <img className="rounded-full border-2 border-gray-700 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" src="https://avatars.githubusercontent.com/u/36776006?v=4" alt="avatar" width={150} height={150} />
            <div className="flex flex-col items-center gap-2 py-4 font-bold text-3xl md:text-4xl lg:text-5xl text-center" style={{lineHeight: 1.2}}>
                <h1 className="">Hey, I'm{" "}
                    <p className="bg-gradient-to-r from-red-500 to-red-600 inline-block text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">Joachim</p>
                </h1>
                <h3 className="flex flex-row gap-2">Software
                    <p className="relative after:absolute after:w-full after:border-t-[3px] after:border-t-red-500 after:h-2 after:rounded-[50%] after:left-0 after:bottom-[-14px] after:content-['']">Developer.</p>
                </h3>
                <p className="text-base lg:text-lg w-fit font-light text-gray-400 mt-3">Software Developer, Fullstack Developer & Data Engineer | Computer Science Student @ PJATK</p>
            </div>
            <a className="btn border-red-700 bg-transparent hover:border-red-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]" href="https://calendly.com/hodanajoachim/30min">
                <span className="bg-gradient-to-r from-red-500 to-red-600 inline-block text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">Book Short Call</span>
                <IoOpenOutline className="text-red-500" size={20} />
            </a>
        </div>
    );
}