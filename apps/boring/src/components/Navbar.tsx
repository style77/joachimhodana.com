import { motion } from "framer-motion";
import { FaWindows } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="flex flex-row justify-between items-center px-8">
            <div className="flex flex-row items-center gap-4">
                <motion.a
                    initial={{ opacity: "0" }}
                    animate={{ opacity: "1" }}
                    transition={{ ease: "easeOut", duration: 2 }}
                    className="hidden md:flex btn text-gray-300 rounded-full bg-transparent border-gray-700 border-2 hover:bg-transparent hover:border-gray-500 w-min"
                    href="mailto:me@joachimhodana.com"
                >
                    me@joachimhodana.com
                </motion.a>
                {/* <motion.a
                    initial={{ opacity: "0" }}
                    animate={{ opacity: "1" }}
                    transition={{ ease: "easeOut", duration: 2 }}
                    className="hidden md:flex btn px-12 text-gray-300 rounded-full bg-transparent border-gray-700 border-2 hover:bg-transparent hover:border-gray-500 w-min"
                    href="https://win.joachimhodana.com/CV.pdf"
                >
                    Resume
                </motion.a> */}
            </div>
            <div className="flex flex-col gap-2">
                <motion.div
                    initial={{ opacity: "0" }}
                    animate={{ opacity: "1" }}
                    transition={{ ease: "easeOut", duration: 2 }}
                    className="flex flex-row gap-3 text-gray-300 lg:text-base text-sm"
                >
                    <a href="https://github.com/style77" className="hover:text-gray-200">Github</a>
                    <p className="text-gray-500 select-none">/</p>
                    <a href="https://linkedin.com/in/joachim-hodana" className="hover:text-gray-200">Linkedin</a>
                    <p className="text-gray-500 select-none">/</p>
                    <a href="https://linktr.ee/joachimhodana" className="hover:text-gray-200">Linktree</a>
                </motion.div>
                <a href="https://win.joachimhodana.com/" className="self-end text-gray-300 hover:text-gray-200 ">
                    <FaWindows size={24} className="lg:block hidden" />
                    <FaWindows size={20} className="lg:hidden block" />
                    <span className="sr-only">Interactive Portfolio</span>
                </a>
            </div>
        </div>
    );
}
