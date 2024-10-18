export async function onBeforeRender() {
    const pageProps = {
        title: "Joachim Hodana",
        description: "Software Developer, Fullstack Developer & Data Engineer.",
    };
    return {
        pageContext: { pageProps },
    };
}
