import axios from 'axios';
import fs from 'fs/promises';

async function fetchContents(url) {
  try {
    const response = await axios.get(url);
    const contents = [];

    for (const item of response.data) {
      console.log(`Fetching ${item.path}`)

      const contentItem = {
        name: item.name,
        type: item.type === 'dir' ? 'dir' : 'file',
        path: item.path
      };

      if (item.type === 'dir') {
        const subContents = await fetchContents(item.url);
        contentItem.children = subContents;
      } else {
        const fileResponse = await axios.get(item.download_url, {
        });
        contentItem.content = fileResponse.data;
      }

      contents.push(contentItem);
    }

    return contents;
  } catch (error) {
    console.error('Error fetching contents:', error);
    return [];
  }
}

async function getAllContents(user, repository) {
  const url = `https://api.github.com/repos/${user}/${repository}/contents/`;
  const allContents = await fetchContents(url);
  return allContents;
}

async function scrapeAndSave(repositories) {
  const scrapedData = {};

  for (const { user, repository } of repositories) {
    console.log(`Scraping ${user}/${repository}`)

    const allContents = await getAllContents(user, repository);
    scrapedData[`${repository}`] = allContents;
  }

  try {
    await fs.writeFile('./src/containers/applications/apps/assets/repos.json', JSON.stringify(scrapedData, null, 2));
    console.log('Scraped data saved to scrapedData.json');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

const repositoriesToScrape = [
  { user: 'style77', repository: 'newsltr' },
  { user: 'style77', repository: 'dealscan' },
  { user: 'style77', repository: 'streamx' },
  { user: 'style77', repository: 'insightguard' },
  { user: 'style77', repository: 'quantex' },
  { user: 'style77', repository: 'joachimhodana.com' },
  { user: 'style77', repository: 'darkangel'}
];

scrapeAndSave(repositoriesToScrape);