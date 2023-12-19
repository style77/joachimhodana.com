import axios from 'axios';

interface Content {
  name: string;
  type: 'file' | 'dir';
  path: string;
  content?: string; // For file content
  children?: Content[]; // For subdirectory contents
}

async function fetchContents(url: string): Promise<Content[]> {
  try {
    const response = await axios.get(url);
    const contents: Content[] = [];

    for (const item of response.data) {
      const contentItem: Content = {
        name: item.name,
        type: item.type === 'dir' ? 'dir' : 'file',
        path: item.path
      };

      if (item.type === 'dir') {
        const subContents = await fetchContents(item.url);
        contentItem.children = subContents;
      } else {
        const fileResponse = await axios.get(item.download_url);
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

export async function getAllContents(user: string, repository: string) {
  const url = `https://api.github.com/repos/${user}/${repository}/contents/`;
  const allContents = await fetchContents(url);
  return allContents;
}