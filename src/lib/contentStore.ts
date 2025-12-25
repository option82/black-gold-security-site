const API_URL = 'https://functions.poehali.dev/35863db1-bef4-47a1-93e6-5374942e52f5';
const DATA_FILE_URL = '/site-data.json';

let cachedData: Record<string, any> | null = null;
let useDatabase = true;

export interface ContentStore {
  getContent: (key: string) => Promise<any>;
  saveContent: (key: string, data: any) => Promise<void>;
  getAllContent: () => Promise<Record<string, any>>;
}

async function fetchFromDatabase(): Promise<Record<string, any>> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Failed to fetch from database');
  } catch (error) {
    console.error('Database fetch error:', error);
    throw error;
  }
}

async function fetchFromStaticFile(): Promise<Record<string, any>> {
  try {
    const response = await fetch(DATA_FILE_URL + '?t=' + Date.now());
    if (response.ok) {
      return await response.json();
    }
    return {};
  } catch (error) {
    console.error('Static file fetch error:', error);
    return {};
  }
}

export const contentStore: ContentStore = {
  async getAllContent() {
    if (cachedData) {
      return { ...cachedData };
    }

    if (useDatabase) {
      try {
        cachedData = await fetchFromDatabase();
        console.log('Content loaded from database');
        return { ...cachedData };
      } catch (error) {
        console.warn('Database unavailable, falling back to static file');
        useDatabase = false;
      }
    }

    cachedData = await fetchFromStaticFile();
    console.log('Content loaded from static file');
    return { ...cachedData };
  },

  async getContent(key: string) {
    const allData = await this.getAllContent();
    return allData[key] || null;
  },

  async saveContent(key: string, data: any) {
    if (!cachedData) {
      cachedData = await this.getAllContent();
    }
    cachedData[key] = data;

    if (useDatabase) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key, data }),
        });

        if (response.ok) {
          console.log(`Content saved to database for key: ${key}`);
          return;
        }
        throw new Error('Failed to save to database');
      } catch (error) {
        console.error('Database save error:', error);
        console.log(`Content updated in memory only for key: ${key}`);
      }
    } else {
      console.log(`Content updated in memory for key: ${key}. Database unavailable.`);
    }
  }
};