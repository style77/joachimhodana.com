import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { FaGithub } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";

type Card = {
    id: number;
    content: JSX.Element | React.ReactNode | string;
    className: string;
    thumbnail: string;
    name: string;
    url: string;
    github: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
    // @ts-ignore
    const [selected, setSelected] = useState<Card | null>(null);
    // @ts-ignore
    const [lastSelected, setLastSelected] = useState<Card | null>(null);

    return (
        <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 relative">
            {cards.map((card, i) => (
                <div key={i} className={cn(card.className, "")}>
                    <motion.div
                        className={cn(
                            card.className,
                            "relative overflow-hidden",
                            selected?.id === card.id
                                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                                : lastSelected?.id === card.id
                                    ? "z-40 bg-white rounded-xl h-full w-full"
                                    : "bg-white rounded-xl h-full w-full"
                        )}
                        layoutId={`card-${card.id}`}
                    >
                        {selected?.id === card.id && <SelectedCard selected={selected} />}
                        <ImageComponent card={card} />
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

const ImageComponent = ({ card }: { card: Card }) => {
    return (
        <div className="relative w-full h-full group">
            <h1 className="text-base group-hover:inline-block absolute bottom-0 left-0 z-10 py-2 px-4 hidden transition font-semibold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.95)]">{card.name}</h1>
            <div className="absolute group-hover:flex flex-row gap-4 bottom-0 right-0 py-3 px-4 z-10 hidden">
                <a className="text-gray-500 hover:text-gray-300" href={card.github}><FaGithub /></a>
                <a className="text-gray-500 hover:text-gray-300" href={card.url}><FaGlobe /></a>
            </div>
            <motion.img
                layoutId={`image-${card.id}-image`}
                src={card.thumbnail}
                height="500"
                width="500"
                className={cn(
                    "object-cover object-top absolute inset-0 h-full w-full transition duration-200 group-hover:scale-105"
                )}
                alt="thumbnail"
            />
        </div>
    );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
    return (
        <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 0.6,
                }}
                className="absolute inset-0 h-full w-full z-10"
            />
            <motion.div
                layoutId={`content-${selected?.id}`}
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: 100,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="relative px-8 pb-4 z-[70]"
            >
                {selected?.content}
            </motion.div>
        </div>
    );
};
