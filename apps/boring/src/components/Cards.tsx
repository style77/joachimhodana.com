export default function Cards() {
    const cardData = [
        {
            id: "tabs-with-card-item-1",
            label: "UX & UI",
            description: "Create a business, whether you’ve got a fresh idea.",
            svgPath: (
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            ),
        },
        {
            id: "tabs-with-card-item-2",
            label: "Web Apps",
            description: "Use automation to scale campaigns profitably and save time doing it.",
            svgPath: (
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            ),
        },
        {
            id: "tabs-with-card-item-3",
            label: "Design & Creativity",
            description: "One tool for your company to share knowledge and ship projects.",
            svgPath: (
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            ),
        },
        {
            id: "tabs-with-card-item-4",
            label: "Development",
            description: "One tool for your company to share knowledge and ship projects.",
            svgPath: (
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            ),
        },
    ];

    return (
        <div className="max-w-[90rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <nav className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                {cardData.map(({ id, label, description, svgPath }, index) => (
                    <div
                        key={id}
                        className={`border-2 border-gray-700 bg-gray-700/25 flex flex-col text-start p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-800 hover:border-red-500 hover:bg-red-500/25 hover:drop-shadow-[0_0_30px_rgba(71,235,235,0.55)] transition duration-300`}
                        id={id}
                        aria-selected={index === 0}
                        data-hs-tab={`#${id}`}
                        aria-controls={id}
                        role="tab"
                    >
                        <svg className="shrink-0 size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {svgPath}
                        </svg>
                        <span className="mt-5">
                            <span className="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">{label}</span>
                            <span className="hidden lg:block mt-2 text-gray-800 dark:text-neutral-200">{description}</span>
                        </span>
                    </div>
                ))}
            </nav>
        </div>
    );
}       