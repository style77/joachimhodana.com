import { FormEvent, useState } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { MdEditCalendar, MdOutlineQuestionMark } from "react-icons/md";

type Result = {
    status: string;
    message: string;
}

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [result, setResult] = useState<Result>();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setResult(undefined);
        setIsSubmitting(true);

        const embedMessage = {
            embeds: [
                {
                    title: "Ktos sie odezwal",
                    fields: [
                        { name: "Name", value: name || "N/A", inline: true },
                        { name: "Email", value: email || "N/A", inline: true },
                        { name: "Message", value: message || "N/A" },
                    ],
                    color: 3447003, // Blue color
                },
            ],
        };

        try {
            const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(embedMessage),
            });

            if (!response.ok) {
                setResult({ status: 'error', message: 'There was an error sending your message. Please try again later.' });
                return;
            };

            setName('');
            setEmail('');
            setMessage('');

            setResult({ status: 'success', message: `Thank you ${name} for your message. I'll get back to you soon!` });
        } catch (error) {
            console.error("Error sending message:", error);
            alert("There was an error sending your message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-14 gap-2">
            <h1 className="font-bold text-4xl relative after:absolute after:w-full after:border-t-[3px] after:border-t-red-500 after:h-2 after:rounded-[50%] after:left-0 after:bottom-[-14px] after:content-['']">Contact me</h1>
            <div className="flex flex-row w-1/2 justify-center py-12">
                <div className="flex flex-col w-1/2 gap-6">
                    <div className="flex flex-row gap-2">
                        <FaRegEnvelopeOpen className="text-gray-700" size={22} />
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-lg text-gray-100">Email me</h1>
                            <a className="text-gray-400 font-light underline" href="mailto:me@joachimhodana.com">me@joachimhodana.com</a>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <MdOutlineQuestionMark className="text-gray-700" size={25} />
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-lg text-gray-100">Check out my blog</h1>
                            <a className="text-gray-400 font-light underline" href="https://medium.com/@joachimhodana">See my articles on Medium</a>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <MdEditCalendar className="text-gray-700" size={25} />
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-lg text-gray-100">Let's talk about your idea</h1>
                            <a className="text-gray-400 font-light underline" href="https://calendly.com/hodanajoachim/30min">Book a short call</a>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <input type="text" id="hs-tac-input-name" className="peer p-4 block w-full bg-gray-700/25 border border-gray-700 rounded-lg text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-red-500 focus:drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6
            focus:pb-2
            [&:not(:placeholder-shown)]:pt-6
            [&:not(:placeholder-shown)]:pb-2
            autofill:pt-6
            autofill:pb-2" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} value={name} required />
                                <label htmlFor="hs-tac-input-name" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400">Name</label>
                            </div>

                            <div className="relative">
                                <input type="email" id="hs-tac-input-email" className="peer p-4 block w-full bg-gray-700/25 border border-gray-700 rounded-lg text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-red-500 focus:drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6
            focus:pb-2
            [&:not(:placeholder-shown)]:pt-6
            [&:not(:placeholder-shown)]:pb-2
            autofill:pt-6
            autofill:pb-2" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                <label htmlFor="hs-tac-input-email" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400">Email</label>
                            </div>

                            <div className="relative">
                                <textarea id="hs-tac-message" className="peer p-4 block w-full bg-gray-700/25 border border-gray-700 rounded-lg text-sm text-white placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-red-500 focus:drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6
            focus:pb-2
            [&:not(:placeholder-shown)]:pt-6
            [&:not(:placeholder-shown)]:pb-2
            autofill:pt-6
            autofill:pb-2" placeholder="This is a textarea placeholder" name="message" onChange={(e) => setMessage(e.target.value)} value={message} required></textarea>
                                <label htmlFor="hs-tac-message" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-neutral-400
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-neutral-400">Tell me about your project</label>
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="text-xs text-neutral-500">
                                All fields are required
                            </p>

                            <p className="mt-5 flex flex-row gap-4">
                                <button className="group inline-flex items-center gap-x-2 py-2 px-3 bg-red-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] font-medium text-sm text-neutral-200 rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                    <svg className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-hover:translate-x-0 group-focus:translate-x-0.5 group-focus:translate-x-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </button>
                                {result && (
                                    <>
                                        <p className={`text-xs text-${result.status === 'success' ? 'green' : 'red'}-700`}>
                                            {result.message}
                                        </p>
                                        <span className="text-green-700 text-red-500" id="text-colors-preload" />
                                    </>
                                )}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
