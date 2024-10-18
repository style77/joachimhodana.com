import { ReactElement } from "react";
import { renderToString } from "react-dom/server";

export { render };

interface PageContext {
    Page: () => ReactElement;
    pageProps: {
        title: string;
        description: string;
    };
}

async function render(pageContext: PageContext) {
    const { Page, pageProps } = pageContext;
    const { title, description } = pageProps;

    const pageHtml = renderToString(Page());

    const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${description}" />
        <meta name="keywords" content="software development, SaaS, web apps" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="https://joachimhodana.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://joachimhodana.com/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://joachimhodana.com" />

      <meta name="description" content="${description}" />

      <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
    </head>
    <body>
      <div id="root" class="scroll-smooth">${pageHtml}</div>
    </body>
  </html>
  `;

    return { documentHtml: html };
}
