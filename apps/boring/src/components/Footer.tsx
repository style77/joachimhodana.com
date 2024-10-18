export default function Footer() {

    const currentYear = new Date().getFullYear();
    return (
        <div className="flex flex-row items-center justify-between w-10/12 py-8">
            <p className="font-light text-xs">© {currentYear} All rights reserved | Made by <a className="font-semibold" href="https://github.com/th11n" rel="norefferer">th1n</a></p>
            <div className="flex-row gap-3 text-gray-300 hidden lg:flex">
                <a href="https://github.com/style77" className="hover:text-gray-200">Github</a>
                <p className="text-gray-500">/</p>
                <a href="https://pl.linkedin.com/in/joachim-hodana" className="hover:text-gray-200">Linkedin</a>
                <p className="text-gray-500">/</p>
                <a href="https://linktr.ee/joachimhodana" className="hover:text-gray-200">Linktree</a>
            </div>
        </div>
    );
}