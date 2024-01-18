# joachimhodana.com

This is the source code for my personal website. It is built using [Vite](https://vitejs.dev/) and [React](https://reactjs.org/).

Keep in mind that i'm not a web developer, so the code might not be the best, but it works 😅.
Thanks to [Blueedge](https://github.com/blueedgetechno/win11React) for the inspiration and open source code of his windows 11 simulator, which i used as a base (basically copied most of styles, but i'm not a designer, so i don't care 😁).

## Development

To run the project locally, you need to have [Node.js](https://nodejs.org/en/) installed.

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm run dev` to start the development server

## Scrape repositories data

To scrape repositories data, you need to have [Node.js](https://nodejs.org/en/) installed.

1. Change PAT in `scrapeRepos.ts` to your own
2. Change `repositoriesToScrape` in `scrapeRepos.ts` to your own 
3. Run `pnpm run scrapeRepos` to scrape repositories data
4. Change `workspaces` in `src/containers/applications/apps/visualstudiocode.tsx` to workspaces you want to use

