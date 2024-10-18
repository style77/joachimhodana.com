import { MdOutlinePersonAdd, MdOutlineCloud, MdOutlineCode, MdBusinessCenter } from "react-icons/md";

export default function Cards() {
    const cardData = [
        {
            id: "tabs-with-card-item-1",
            label: "Full Stack Development",
            description: "Developing responsive and engaging websites tailored to your business needs. Comprehensive solutions from front-end to back-end.",
            icon: <MdOutlineCode className="shrink-0 text-gray-800 dark:text-white" size={24} />,
        },
        {
            id: "tabs-with-card-item-2",
            label: "MVP Development",
            description: "Building and launching your product idea with a minimum viable product approach.",
            icon: <MdOutlinePersonAdd className="shrink-0 text-gray-800 dark:text-white" size={24} />,
        },
        {
            id: "tabs-with-card-item-3",
            label: "IT Consulting",
            description: "Providing expert advice on software architecture, development, and deployment.",
            icon: <MdBusinessCenter className="shrink-0 text-gray-800 dark:text-white" size={24} />,
        },
        {
            id: "tabs-with-card-item-4",
            label: "Cloud Services",
            description: "Simplifying deployment with efficient cloud serverless architectures.",
            icon: <MdOutlineCloud className="shrink-0 text-gray-800 dark:text-white" size={24} />,
        },
    ];

    return (
        <div className="max-w-[90rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" id="services">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                {cardData.map(({ id, label, description, icon }, index) => (
                    <div
                        key={id}
                        className={`border-2 border-gray-700 bg-gray-700/25 flex flex-col text-start p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-800 hover:border-red-500 hover:bg-red-500/25 hover:drop-shadow-[0_0_30px_rgba(71,235,235,0.55)] transition duration-300`}
                        id={id}
                        aria-selected={index === 0}
                        data-hs-tab={`#${id}`}
                        aria-controls={id}
                        role="tab"
                    >
                        {icon}
                        <span className="mt-5">
                            <span className="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">{label}</span>
                            <span className="hidden mt-2 text-gray-800 dark:text-neutral-200 lg:text-base text-xs">{description}</span>
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center w-full mt-6">
                <h2 className="text-sm font-regular text-center text-neutral-300">
                    Cannot find what you're looking for? Let's connect and discuss your project!
                </h2>
                <a
                    href="#contact"
                    className="text-neutral-200 w-full mt-2 text-center text-xl font-semibold"
                >
                    Contact
                </a>
            </div>
        </div>
    );
}       