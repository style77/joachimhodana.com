import { motion } from "framer-motion";

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
                <motion.a
                    initial={{ opacity: "0" }}
                    animate={{ opacity: "1" }}
                    transition={{ ease: "easeOut", duration: 2 }}
                    className="hidden md:flex btn px-12 text-gray-300 rounded-full bg-transparent border-gray-700 border-2 hover:bg-transparent hover:border-gray-500 w-min"
                    href="https://win.joachimhodana.com/CV.pdf"
                >
                    CV
                </motion.a>
            </div>
            <motion.div
                initial={{ opacity: "0" }}
                animate={{ opacity: "1" }}
                transition={{ ease: "easeOut", duration: 2 }}
                className="flex flex-row gap-3 text-gray-300"
            >
                <a href="https://github.com/style77" className="hover:text-gray-200">Github</a>
                <p className="text-gray-500">/</p>
                <a href="https://linkedin.com/in/joachim-hodana" className="hover:text-gray-200">Linkedin</a>
                <p className="text-gray-500">/</p>
                <a href="https://linktr.ee/joachimhodana" className="hover:text-gray-200">Linktree</a>
            </motion.div>
        </div>
    );
}
