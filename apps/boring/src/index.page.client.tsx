import ReactDOM from 'react-dom/client';
import { Analytics } from "@vercel/analytics/react"

export { render };

function render(pageContext: { Page: () => JSX.Element }) {
    const { Page } = pageContext;
    const container = document.getElementById('root');

    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
            <>
                <Analytics />
                <Page />
            </>
        );
    } else {
        console.error('No root element found.');
    }
}
